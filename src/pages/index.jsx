import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [views, setViews] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  async function createPaste() {
    setError("");
    setUrl("");

    const res = await fetch("/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
        ttl_seconds: ttl ? Number(ttl) : undefined,
        max_views: views ? Number(views) : undefined,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Error");
    } else {
      setUrl(data.url);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Pastebin Lite</h1>

      <textarea
        rows={10}
        cols={60}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div>
        TTL (seconds):{" "}
        <input value={ttl} onChange={(e) => setTtl(e.target.value)} />
      </div>

      <div>
        Max Views:{" "}
        <input value={views} onChange={(e) => setViews(e.target.value)} />
      </div>

      <button onClick={createPaste}>Create Paste</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {url && (
        <p>
          Share URL: <a href={url}>{url}</a>
        </p>
      )}
    </div>
  );
}
