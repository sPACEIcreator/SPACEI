export default async (req: Request) => {
  if (req.method !== "POST") {
    return Response.json({ error: "POST required" }, { status: 405 });
  }

  const apiKey = Netlify.env.get("OPENAI_API_KEY");
  if (!apiKey) {
    return Response.json({ error: "SPACEI image generation is not configured yet." }, { status: 503 });
  }

  try {
    const body = await req.json();
    const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";
    if (!prompt) return Response.json({ error: "Prompt is required." }, { status: 400 });
    if (prompt.length > 4000) return Response.json({ error: "Prompt is too long." }, { status: 413 });

    const size = ["1024x1024", "1536x1024", "1024x1536"].includes(body?.size)
      ? body.size
      : "1024x1024";

    const upstream = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-image-2",
        prompt,
        size
      })
    });

    const data = await upstream.json();
    if (!upstream.ok) {
      console.error("OpenAI image error", upstream.status, data?.error?.message || "unknown");
      return Response.json({ error: "Image request failed." }, { status: upstream.status });
    }

    const first = data?.data?.[0];
    if (first?.b64_json) {
      return Response.json({ ok: true, image: `data:image/png;base64,${first.b64_json}` });
    }
    if (first?.url) {
      return Response.json({ ok: true, image: first.url });
    }

    return Response.json({ error: "No image was returned." }, { status: 502 });
  } catch (error) {
    console.error("SPACEI image function error", error);
    return Response.json({ error: "SPACEI image backend error." }, { status: 500 });
  }
};

export const config = { path: "/api/image" };
