import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function PastePage() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    fetch(`/api/pastes/${id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setData)
      .catch(() => setError("Paste not found or expired"));
  }, [id]);

  if (error) return <h1>404 - {error}</h1>;
  if (!data) return <p>Loading...</p>;

  return (
    <pre style={{ padding: 20, whiteSpace: "pre-wrap" }}>
      {data.content}
    </pre>
  );
}
