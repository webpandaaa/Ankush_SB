import { useParams } from "react-router-dom";
import { api } from "../api/axios";

export default function HealthDetails() {
  const { userId } = useParams();

  const save = () =>
    api.post(`/health/${userId}`, { smoker: true, bmi: 32 });

  return (
    <>
      <h2>Health Details</h2>
      <button onClick={save}>Save Sample Health</button>
    </>
  );
}
