import { getStore } from "@netlify/blobs";

const store = getStore({ name: "spacei-social-v1", consistency: "strong" });
const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }
});
const clean = (v, n = 80) => String(v ?? "").trim().slice(0, n);
const key = (v) => clean(v, 64).replace(/^@/, "").toLowerCase();
const read = async (k, fallback) => (await store.get(k, { type: "json" })) ?? fallback;
const write = (k, v) => store.setJSON(k, v);
const tokenHash = async (token) => {
  const bytes = new TextEncoder().encode(token);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map(x => x.toString(16).padStart(2, "0")).join("");
};
const id = () => crypto.randomUUID();
const now = () => new Date().toISOString();

async function userByToken(token) {
  if (!token) return null;
  const hash = await tokenHash(token);
  const index = await read("token-index", {});
  const handle = index[hash];
  return handle ? await read("user:" + handle, null) : null;
}
async function requireUser(req) {
  const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  return userByToken(token);
}
async function listUsers(q = "") {
  const ids = await read("user-index", []);
  const users = [];
  for (const h of ids) {
    const u = await read("user:" + h, null);
    if (u && (!q || (u.handle + " " + u.displayName).toLowerCase().includes(q.toLowerCase()))) {
      users.push({ handle: u.handle, displayName: u.displayName, bio: u.bio || "", title: u.title || "", verified: !!u.verified, createdAt: u.createdAt });
    }
  }
  return users.slice(-300).reverse();
}
export default async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: { "access-control-allow-origin": "*", "access-control-allow-methods": "GET,POST,OPTIONS", "access-control-allow-headers": "content-type,authorization" } });
  const url = new URL(req.url);
  const action = url.searchParams.get("action") || "";
  try {
    if (req.method === "GET") {
      if (action === "users") return json({ users: await listUsers(clean(url.searchParams.get("q"), 80)) });
      if (action === "videos") {
        const ids = await read("video-index", []);
        const videos = [];
        for (const vid of ids.slice(-100).reverse()) {
          const v = await read("video:" + vid, null);
          if (v && v.privacy === "public") videos.push(v);
        }
        return json({ videos });
      }
      if (action === "profile") {
        const h = key(url.searchParams.get("handle"));
        const u = await read("user:" + h, null);
        return u ? json({ user: { handle:u.handle, displayName:u.displayName, bio:u.bio, title:u.title, verified:u.verified, createdAt:u.createdAt } }) : json({ error:"User not found" }, 404);
      }
      if (action === "messages" || action === "notifications") {
        const me = await requireUser(req);
        if (!me) return json({ error:"Sign in again to access your inbox." }, 401);
        const data = await read(action + ":" + me.handle, []);
        return json({ [action]: data });
      }
      return json({ error:"Unknown action" }, 404);
    }
    if (req.method !== "POST") return json({ error:"Method not allowed" }, 405);
    const body = await req.json();
    if (action === "register") {
      const requested = key(body.handle || body.username || body.displayName);
      if (!requested || !/^[a-z0-9._-]{3,32}$/.test(requested)) return json({ error:"Choose a 3–32 character username using letters, numbers, dots, _ or -." }, 400);
      const existing = await read("user:" + requested, null);
      if (existing) return json({ error:"That account already exists. Account recovery/sign-in is required." }, 409);
      const token = [...crypto.getRandomValues(new Uint8Array(32))].map(x => x.toString(16).padStart(2, "0")).join("");
      const user = { handle:"@" + requested, displayName:clean(body.displayName || body.username || requested, 48), bio:"", title:"", verified:false, createdAt:now(), tokenHash:await tokenHash(token) };
      await write("user:" + requested, user);
      const index = await read("user-index", []);
      index.push(requested); await write("user-index", index);
      const tokens = await read("token-index", {});
      tokens[user.tokenHash] = requested; await write("token-index", tokens);
      return json({ user:{ handle:user.handle, displayName:user.displayName }, token }, 201);
    }
    if (action === "profile") {
      const me = await requireUser(req);
      if (!me) return json({ error:"Sign in again to edit your profile." }, 401);
      const user = await read("user:" + key(me.handle), null);
      user.displayName = clean(body.displayName || user.displayName, 48);
      user.bio = clean(body.bio, 240);
      await write("user:" + key(me.handle), user);
      return json({ ok:true });
    }
    if (action === "video") {
      const me = await requireUser(req);
      if (!me) return json({ error:"Sign in again before posting." }, 401);
      const title = clean(body.title, 90), caption = clean(body.caption, 500), dataUrl = String(body.dataUrl || "");
      if (!title || body.privacy !== "public") return json({ error:"A title and public visibility are required." }, 400);
      if (dataUrl.length > 5_600_000 || (dataUrl && !/^data:video\/(mp4|webm|quicktime);base64,/i.test(dataUrl))) return json({ error:"Video file is too large or uses an unsupported format (maximum about 4 MB)." }, 413);
      const vid = { id:id(), handle:me.handle, user:me.displayName, title, caption, src:dataUrl, privacy:"public", createdAt:now() };
      await write("video:" + vid.id, vid);
      const index = await read("video-index", []); index.push(vid.id); await write("video-index", index);
      return json({ ok:true, video:vid }, 201);
    }
    if (action === "message") {
      const me = await requireUser(req);
      if (!me) return json({ error:"Sign in again to send messages." }, 401);
      const to = key(body.to);
      const recipient = await read("user:" + to, null);
      if (!recipient) return json({ error:"Recipient account not found." }, 404);
      const message = { id:id(), from:me.handle, fromName:me.displayName, to:recipient.handle, text:clean(body.text, 2000), createdAt:now() };
      if (!message.text) return json({ error:"Message cannot be empty." }, 400);
      const inbox = await read("messages:" + to, []); inbox.push(message); await write("messages:" + to, inbox.slice(-500));
      const notices = await read("notifications:" + to, []);
      notices.push({ id:id(), type:"message", text:"New message from " + me.displayName, createdAt:now(), read:false });
      await write("notifications:" + to, notices.slice(-200));
      return json({ ok:true, message:{ id:message.id, createdAt:message.createdAt } }, 201);
    }
    if (action === "notify") {
      const me = await requireUser(req);
      if (!me) return json({ error:"Sign in again." }, 401);
      const to = key(body.to), recipient = await read("user:" + to, null);
      if (!recipient) return json({ error:"Recipient account not found." }, 404);
      const notices = await read("notifications:" + to, []);
      notices.push({ id:id(), type:clean(body.type || "update", 24), text:clean(body.text, 240), createdAt:now(), read:false });
      await write("notifications:" + to, notices.slice(-200));
      return json({ ok:true }, 201);
    }
    if (action === "report") {
      const me = await requireUser(req);
      if (!me) return json({ error:"Sign in again to submit a report." }, 401);
      const reports = await read("reports", []);
      reports.push({ id:id(), from:me.handle, target:clean(body.target, 64), reason:clean(body.reason, 80), details:clean(body.details, 1000), status:"open", createdAt:now() });
      await write("reports", reports.slice(-1000));
      return json({ ok:true }, 201);
    }
    return json({ error:"Unknown action" }, 404);
  } catch (error) {
    return json({ error:"Backend error: " + clean(error?.message || "unknown", 180) }, 500);
  }
};
