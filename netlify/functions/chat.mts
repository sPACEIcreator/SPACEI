export default async (req: Request) => {
  if (req.method !== "POST") {
    return Response.json({ error: "POST required" }, { status: 405 });
  }

  const apiKey = Netlify.env.get("OPENAI_API_KEY");
  if (!apiKey) {
    return Response.json({ error: "SPACEI AI backend is not configured yet." }, { status: 503 });
  }

  try {
    const body = await req.json();
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    if (!message) return Response.json({ error: "Message is required." }, { status: 400 });
    if (message.length > 12000) return Response.json({ error: "Message is too long." }, { status: 413 });

    const upstream = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-5.6-luna",
        input: message,
        max_output_tokens: 2000
      })
    });

    const data = await upstream.json();
    if (!upstream.ok) {
      console.error("OpenAI chat error", upstream.status, data?.error?.message || "unknown");
      return Response.json({ error: "AI request failed." }, { status: upstream.status });
    }

    let text = "";
    for (const item of data?.output || []) {
      for (const part of item?.content || []) {
        if (part?.type === "output_text" && typeof part?.text === "string") text += part.text;
      }
    }

    return Response.json({ ok: true, text: text || "No text response was returned." });
  } catch (error) {
    console.error("SPACEI chat function error", error);
    return Response.json({ error: "SPACEI AI backend error." }, { status: 500 });
  }
};

export const config = { path: "/api/chat" };
