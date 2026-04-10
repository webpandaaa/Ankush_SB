import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/axios";

export default function PremiumHistory() {
  const { userId } = useParams();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    api.get(`/premium-history/user/${userId}`).then(r => setData(r.data));
  }, []);

  return (
    <>
      <h2>Premium History</h2>
      <ul>
        {data.map(p => (
          <li key={p.id}>{p.riskCategory} — ₹{p.finalPremium}</li>
        ))}
      </ul>
    </>
  );
}
