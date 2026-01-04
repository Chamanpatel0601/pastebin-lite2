import { useRouter } from "next/router";
import { useEffect, useState } from "react";
//import "../styles.css";

export default function PastePage() {
  const router = useRouter();
  const { id } = router.query;

  const [paste, setPaste] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    fetch(`/api/pastes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setPaste(data);
      });
  }, [id]);

  if (error) return <h2 className="error">{error}</h2>;
  if (!paste) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>Your Paste</h2>
      <pre>{paste.content}</pre>

      <div className="meta">
        {paste.remaining_views !== null && (
          <span>Views Left: {paste.remaining_views}</span>
        )}
        {paste.expires_at && (
          <span>
            Expires At: {new Date(paste.expires_at).toLocaleString()}
          </span>
        )}
      </div>
    </div>
  );
}
