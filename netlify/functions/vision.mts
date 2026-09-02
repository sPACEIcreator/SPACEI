export default async (req: Request) => {
  if (req.method !== "POST") {
    return Response.json({ error: "POST required" }, { status: 405 });
  }

  const apiKey = Netlify.env.get("OPENAI_API_KEY");
  if (!apiKey) {
    return Response.json({ error: "SPACEI vision is not configured yet." }, { status: 503 });
  }

  try {
    const body = await req.json();
    const prompt = typeof body?.prompt === "string" && body.prompt.trim()
      ? body.prompt.trim()
      : "Describe this image and answer the user's question about it.";
    const image = typeof body?.image === "string" ? body.image.trim() : "";

    if (!image) return Response.json({ error: "Image is required." }, { status: 400 });
    if (!image.startsWith("https://") && !image.startsWith("http://") && !image.startsWith("data:image/")) {
      return Response.json({ error: "Image must be a URL or image data URL." }, { status: 400 });
    }

    const upstream = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-5.6-luna",
        input: [{
          role: "user",
          content: [
            { type: "input_text", text: prompt },
            { type: "input_image", image_url: image, detail: "auto" }
          ]
        }]
      })
    });

    const data = await upstream.json();
    if (!upstream.ok) {
      console.error("OpenAI vision error", upstream.status, data?.error?.message || "unknown");
      return Response.json({ error: "Vision request failed." }, { status: upstream.status });
    }

    const text = Array.isArray(data?.output)
      ? data.output.flatMap((item: any) => item?.content || []).find((part: any) => part?.type === "output_text")?.text
      : undefined;

    return Response.json({ ok: true, text: text || "I couldn't extract a response from that image." });
  } catch (error) {
    console.error("SPACEI vision function error", error);
    return Response.json({ error: "SPACEI vision backend error." }, { status: 500 });
  }
};

export const config = { path: "/api/vision" };
