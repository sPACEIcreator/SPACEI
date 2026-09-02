export default async (req: Request) => {
  if (req.method !== "POST") {
    return Response.json({ error: "POST required" }, { status: 405 });
  }

  const apiKey = Netlify.env.get("OPENAI_API_KEY");
  if (!apiKey) {
    return Response.json({ error: "SPACEI file analysis is not configured yet." }, { status: 503 });
  }

  try {
    const body = await req.json();
    const prompt = typeof body?.prompt === "string" && body.prompt.trim()
      ? body.prompt.trim()
      : "Analyze this file and summarize the important information.";
    const fileData = typeof body?.fileData === "string" ? body.fileData.trim() : "";
    const filename = typeof body?.filename === "string" && body.filename.trim()
      ? body.filename.trim().slice(0, 160)
      : "upload.txt";

    if (!fileData) return Response.json({ error: "File data is required." }, { status: 400 });
    if (fileData.length > 12_000_000) return Response.json({ error: "File is too large for this beta endpoint." }, { status: 413 });

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
            { type: "input_file", filename, file_data: fileData }
          ]
        }]
      })
    });

    const data = await upstream.json();
    if (!upstream.ok) {
      console.error("OpenAI file analysis error", upstream.status, data?.error?.message || "unknown");
      return Response.json({ error: "File analysis request failed." }, { status: upstream.status });
    }

    const text = Array.isArray(data?.output)
      ? data.output.flatMap((item: any) => item?.content || []).find((part: any) => part?.type === "output_text")?.text
      : undefined;

    return Response.json({ ok: true, text: text || "No file-analysis answer was returned." });
  } catch (error) {
    console.error("SPACEI file analysis function error", error);
    return Response.json({ error: "SPACEI file-analysis backend error." }, { status: 500 });
  }
};

export const config = { path: "/api/file-analyze" };
