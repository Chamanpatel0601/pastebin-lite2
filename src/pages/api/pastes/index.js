import { redis } from "@/lib/redis";
import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { content, ttl_seconds, max_views } = req.body;

  if (!content || typeof content !== "string") {
    return res.status(400).json({ error: "Content is required" });
  }

  const ttl =
    ttl_seconds && Number.isInteger(ttl_seconds) && ttl_seconds > 0
      ? ttl_seconds
      : null;

  const views =
    max_views && Number.isInteger(max_views) && max_views > 0
      ? max_views
      : null;

  const id = crypto.randomUUID();

  const paste = {
    content,
    remaining_views: views,
    expires_at: ttl ? Date.now() + ttl * 1000 : null,
  };

  await redis.set(`paste:${id}`, paste);

  if (ttl) {
    await redis.expire(`paste:${id}`, ttl);
  }

  res.status(201).json({
    id,
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/p/${id}`,
  });
}
