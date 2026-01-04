import kv from "@/lib/kv";
import { getNowMs } from "@/lib/time";

export default async function handler(req, res) {
  const { id } = req.query;
  const paste = await kv.get(`paste:${id}`);

  if (!paste) {
    return res.status(404).json({ error: "Not found" });
  }

  const now = getNowMs(req);

  if (paste.expires_at && now >= paste.expires_at) {
    return res.status(404).json({ error: "Expired" });
  }

  if (paste.max_views !== null && paste.views >= paste.max_views) {
    return res.status(404).json({ error: "View limit exceeded" });
  }

  paste.views += 1;
  await kv.set(`paste:${id}`, paste);

  res.status(200).json({
    content: paste.content,
    remaining_views:
      paste.max_views === null ? null : Math.max(paste.max_views - paste.views, 0),
    expires_at: paste.expires_at ? new Date(paste.expires_at).toISOString() : null,
  });
}
