import kv from "@/lib/kv";

export default async function handler(req, res) {
  try {
    await kv.ping();
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false });
  }
}
