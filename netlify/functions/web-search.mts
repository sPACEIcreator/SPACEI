export default async (req: Request) => {
  if (req.method !== "POST") {
    return Response.json({ error: "POST required" }, { status: 405 });
  }

  const apiKey = Netlify.env.get("OPENAI_API_KEY");
  if (!apiKey) {
    return Response.json({ error: "SPACEI web search is not configured yet." }, { status: 503 });
  }

  try {
    const body = await req.json();
    const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";
    if (!prompt) return Response.json({ error: "Prompt is required." }, { status: 400 });
    if (prompt.length > 8000) return Response.json({ error: "Prompt is too long." }, { status: 413 });

    const upstream = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-5.6-luna",
        tools: [{ type: "web_search" }],
        input: prompt
      })
    });

    const data = await upstream.json();
    if (!upstream.ok) {
      console.error("OpenAI web search error", upstream.status, data?.error?.message || "unknown");
      return Response.json({ error: "Web search request failed." }, { status: upstream.status });
    }

    const text = Array.isArray(data?.output)
      ? data.output.flatMap((item: any) => item?.content || []).find((part: any) => part?.type === "output_text")?.text
      : undefined;

    // Pull source metadata from OpenAI web-search annotations so SPACEI can render
    // the same kind of small site cards used by modern AI search UIs.
    const sources: Array<{ url: string; title: string; domain: string }> = [];
    const seen = new Set<string>();
    const outputItems = Array.isArray(data?.output) ? data.output : [];
    for (const item of outputItems) {
      for (const part of (item?.content || [])) {
        const annotations = Array.isArray(part?.annotations) ? part.annotations : [];
        for (const annotation of annotations) {
          const url = typeof annotation?.url === "string" ? annotation.url : "";
          if (!url || seen.has(url)) continue;
          seen.add(url);
          try {
            const parsed = new URL(url);
            const domain = parsed.hostname.replace(/^www\\./, "");
            const title = typeof annotation?.title === "string" && annotation.title.trim()
              ? annotation.title.trim()
              : domain;
            sources.push({ url, title, domain });
          } catch {
            // Ignore malformed source URLs rather than breaking the search result.
          }
        }
      }
    }

    return Response.json({
      ok: true,
      text: text || "No web-search answer was returned.",
      sources: sources.slice(0, 8)
    });
  } catch (error) {
    console.error("SPACEI web search function error", error);
    return Response.json({ error: "SPACEI web-search backend error." }, { status: 500 });
  }
};

export const config = { path: "/api/web-search" };
