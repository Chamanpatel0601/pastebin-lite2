import { redis } from "@/lib/redis";

export default async function handler(req, res) {
  const { id } = req.query;

  const paste = await redis.get(`paste:${id}`);

  if (!paste) {
    return res.status(404).json({ error: "Paste not found" });
  }

  if (paste.expires_at && Date.now() > paste.expires_at) {
    await redis.del(`paste:${id}`);
    return res.status(404).json({ error: "Paste expired" });
  }

  if (paste.remaining_views !== null) {
    if (paste.remaining_views <= 0) {
      await redis.del(`paste:${id}`);
      return res.status(404).json({ error: "View limit exceeded" });
    }

    paste.remaining_views -= 1;
    await redis.set(`paste:${id}`, paste);
  }

  res.status(200).json({
    content: paste.content,
    remaining_views: paste.remaining_views,
    expires_at: paste.expires_at,
  });
}
