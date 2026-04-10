import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api/axios";
import "../styles/userDetails.css";

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);
  const [health, setHealth] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const userRes = await api.get(`/users/${id}`);
      setUser(userRes.data);

      const healthRes = await api.get(`/health/${id}`);
      setHealth(healthRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <div className="loading">Loading...</div>;

  return (
    <div className="details-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="details-card">
        <h2>{user.fullName}</h2>

        <div className="section">
          <h3>Personal Information</h3>
          <div className="info-grid">
            <div><strong>Email:</strong> {user.email}</div>
            <div><strong>Mobile:</strong> {user.mobile}</div>
            <div><strong>Gender:</strong> {user.gender}</div>
            <div><strong>Date of Birth:</strong> {user.dateOfBirth}</div>
            <div><strong>Profession:</strong> {user.profession?.name}</div>
          </div>
        </div>

        <div className="section">
          <h3>Health Details</h3>
          {health ? (
            <div className="info-grid">
              <div><strong>BMI:</strong> {health.bmi}</div>
              <div><strong>Smoker:</strong> {health.smoker ? "Yes" : "No"}</div>
              <div><strong>Alcoholic:</strong> {health.alcoholic ? "Yes" : "No"}</div>
              <div><strong>Blood Pressure:</strong> {health.bp ? "Yes" : "No"}</div>
              <div><strong>Diabetes:</strong> {health.diabetes ? "Yes" : "No"}</div>
            </div>
          ) : (
            <p>No health record found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
