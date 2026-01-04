import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [views, setViews] = useState("");
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  async function createPaste() {
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
    setUrl(data.url);
    setCopied(false);
  }

  function copyLink() {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="container">
      <h1>Pastebin Lite</h1>

      <textarea
        placeholder="Paste your content here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="options">
        <input
          type="number"
          placeholder="TTL (seconds)"
          value={ttl}
          onChange={(e) => setTtl(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Views"
          value={views}
          onChange={(e) => setViews(e.target.value)}
        />
      </div>

      <button onClick={createPaste}>Create Paste</button>

      {url && (
  <div className="link-box">
    <p className="label">Your Paste Link</p>

    <input className="link-input" readOnly value={url} />

    <div className="link-actions">
      <button className="copy-btn" onClick={copyLink}>
        {copied ? "Copied ✓" : "Copy"}
      </button>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="open-btn"
      >
        Open
      </a>
    </div>
  </div>
)}

    </div>
  );
}
