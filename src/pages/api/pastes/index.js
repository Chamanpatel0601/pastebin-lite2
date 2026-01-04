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

  if (ttl_seconds && (!Number.isInteger(ttl_seconds) || ttl_seconds < 1)) {
    return res.status(400).json({ error: "Invalid ttl_seconds" });
  }

  if (max_views && (!Number.isInteger(max_views) || max_views < 1)) {
    return res.status(400).json({ error: "Invalid max_views" });
  }

  const id = crypto.randomUUID();

  const paste = {
    content,
    remaining_views: max_views ?? null,
    expires_at: ttl_seconds ? Date.now() + ttl_seconds * 1000 : null,
  };

  await redis.set(`paste:${id}`, paste);

  if (ttl_seconds) {
    await redis.expire(`paste:${id}`, ttl_seconds);
  }

  res.status(201).json({
    id,
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/p/${id}`,
  });
}
