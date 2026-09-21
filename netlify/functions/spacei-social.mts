import { getStore } from "@netlify/blobs";

const store = getStore("spacei-social", { consistency: "strong" });

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });

function clean(v, max = 120) {
  return String(v ?? "").trim().slice(0, max);
}

function distance(a, b) {
  a = a.toLowerCase(); b = b.toLowerCase();
  const dp = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = dp[0]; dp[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const old = dp[j];
      dp[j] = Math.min(
        dp[j] + 1,
        dp[j - 1] + 1,
        prev + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
      prev = old;
    }
  }
  return dp[b.length];
}

async function getUser(handle) {
  return await store.get(`users/${handle.replace(/^@/, "").toLowerCase()}`, { type: "json" });
}

async function nextUserNumber() {
  const current = Number(await store.get("meta/next-user-id", { type: "text" }) || "1");
  await store.set("meta/next-user-id", String(current + 1));
  return current;
}

export default async (request) => {
  const url = new URL(request.url);
  const action = url.searchParams.get("action") || "users";

  if (request.method === "GET") {
    if (action === "video") {
      const id = clean(url.searchParams.get("id"), 100);
      const blob = await store.get(`video-files/${id}`, { type: "blob" });
      if (!blob) return new Response("Not found", { status: 404 });
      return new Response(blob, { headers: { "content-type": "video/mp4", "cache-control": "public, max-age=31536000, immutable" } });
    }

    if (action === "users") {
      const q = clean(url.searchParams.get("q"), 80).toLowerCase();
      const { blobs } = await store.list({ prefix: "users/" });
      const users = [];
      for (const b of blobs) {
        const u = await store.get(b.key, { type: "json" });
        if (!u) continue;
        const hay = `${u.handle} ${u.displayName} ${u.username || ""}`.toLowerCase();
        const d = q ? Math.min(distance(q.replace(/^@/, ""), String(u.handle).replace(/^@/, "")), distance(q, String(u.displayName || ""))) : 0;
        if (!q || hay.includes(q) || d <= Math.max(2, Math.floor(q.length * 0.35))) {
          users.push({ ...u, score: d });
        }
      }
      users.sort((a, b) => a.score - b.score || String(a.displayName).localeCompare(String(b.displayName)));
      return json({ users });
    }

    if (action === "videos") {
      const { blobs } = await store.list({ prefix: "videos/" });
      const videos = [];
      for (const b of blobs) {
        const v = await store.get(b.key, { type: "json" });
        if (v?.privacy === "public") videos.push(v);
      }
      videos.sort((a, b) => Number(b.createdAt || 0) - Number(a.createdAt || 0));
      return json({ videos });
    }

    return json({ error: "Unknown action" }, 400);
  }

  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let body;
  try { body = await request.json(); } catch { return json({ error: "Invalid JSON" }, 400); }

  if (action === "register") {
    const displayName = clean(body.displayName, 60);
    if (!displayName) return json({ error: "Display name required" }, 400);

    if (body.handle) {
      const wanted = clean(body.handle, 40).toLowerCase();
      if (!/^@?user\d+$/.test(wanted)) return json({ error: "Invalid handle" }, 400);
      if (await getUser(wanted)) return json({ error: "Handle already exists" }, 409);
    }

    const number = body.handle ? Number(String(body.handle).replace(/\D/g, "")) : await nextUserNumber();
    const handle = `@user${number}`;
    if (await getUser(handle)) return json({ error: "Handle already exists" }, 409);

    const user = {
      handle,
      displayName,
      username: clean(body.username, 60),
      createdAt: Date.now(),
    };
    await store.setJSON(`users/user${number}`, user);
    return json({ user }, 201);
  }

  if (action === "profile") {
    const handle = clean(body.handle, 40).toLowerCase();
    if (!/^@user\d+$/.test(handle)) return json({ error: "Valid handle required" }, 400);
    const user = await getUser(handle);
    if (!user) return json({ error: "User not found" }, 404);
    user.displayName = clean(body.displayName, 60) || user.displayName;
    user.username = clean(body.username, 60);
    user.bio = clean(body.bio, 500);
    await store.setJSON(`users/${handle.replace("@", "")}`, user);
    return json({ user });
  }

  if (action === "video") {
    const handle = clean(body.handle, 40).toLowerCase();
    const user = await getUser(handle);
    if (!user) return json({ error: "User not found" }, 404);
    const title = clean(body.title, 120);
    const caption = clean(body.caption, 500);
    const privacy = body.privacy === "private" ? "private" : "public";
    if (!title) return json({ error: "Title required" }, 400);

    const id = `v-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const src = String(body.dataUrl || "");
    if (src) {
      const match = src.match(/^data:([^;]+);base64,(.+)$/);
      if (!match) return json({ error: "Invalid video data" }, 400);
      const bytes = Math.floor(match[2].length * 0.75);
      if (bytes > 4_000_000) return json({ error: "Video is over the 4 MB upload limit" }, 413);
      await store.set(`video-files/${id}`, Buffer.from(match[2], "base64"));
    }

    const video = {
      id, handle, user: user.displayName, title, caption, privacy,
      src: src ? `/.netlify/functions/spacei-social?action=video&id=${encodeURIComponent(id)}` : "",
      createdAt: Date.now(),
    };
    await store.setJSON(`videos/${id}`, video);
    return json({ video }, 201);
  }

  return json({ error: "Unknown action" }, 400);
};

export const config = {
  path: "/api/spacei-social",
  rateLimit: { windowLimit: 120, windowSize: 60, aggregateBy: ["ip"] }
};
