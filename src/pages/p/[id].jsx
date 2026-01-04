import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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

  if (error) return <h2>{error}</h2>;
  if (!paste) return <p>Loading...</p>;

  return (
    <pre style={{ whiteSpace: "pre-wrap" }}>
      {paste.content}
    </pre>
  );
}
