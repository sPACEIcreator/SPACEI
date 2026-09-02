export default async () => {
  const configured = Boolean(Netlify.env.get("OPENAI_API_KEY"));
  return Response.json({
    ok: true,
    backend: "SPACEI Cloud Brain",
    configured,
    features: {
      chat: configured,
      imageGeneration: configured
    }
  });
};

export const config = { path: "/api/ai-status" };
