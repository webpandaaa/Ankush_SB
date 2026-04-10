import { useEffect, useState } from "react";
import { api } from "../api/axios";
import "../styles/PremiumCalculator.css";

interface Hobby {
  id: number;
  name: string;
  riskScore: number;
}

interface Profession {
  id: number;
  name: string;
  riskScore: number;
}

interface User {
  id: number;
  fullName: string;
  email: string;
  mobile: string;
  gender: string;
  dateOfBirth: string;
  profession: Profession;
  hobbies: Hobby[];
}

interface Policy {
  id: number;
  name: string;
  basePremium: number;
}

interface PremiumResult {
  id: number;
  finalPremium: number;
  totalRiskScore: number;
  riskCategory: string;
  policyType: Policy;
  user: User;
}

export default function PremiumCalculator() {
  const [users, setUsers] = useState<User[]>([]);
  const [policies, setPolicies] = useState<Policy[]>([]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);

  const [userSearch, setUserSearch] = useState("");
  const [policySearch, setPolicySearch] = useState("");

  const [result, setResult] = useState<PremiumResult | null>(null);

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    api.get("http://localhost:8085/api/users").then(res => setUsers(res.data));
    api.get("http://localhost:8085/api/policies").then(res => setPolicies(res.data));
  }, []);

  const calculate = async () => {
    if (!selectedUser || !selectedPolicy) {
      alert("Please select user and policy");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post<PremiumResult>(
        `/premium/calculate?userId=${selectedUser.id}&policyId=${selectedPolicy.id}`
      );

      setResult(res.data);
      setShowModal(true);

    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(u =>
    u.fullName.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredPolicies = policies.filter(p =>
    p.name.toLowerCase().includes(policySearch.toLowerCase())
  );

  return (
    <div className="premium-container">

      <div className="premium-card">

        <h2>Premium Calculator</h2>

        {/* USER */}

        <div className="dropdown">
          <label>Select User</label>
          <input
            placeholder="Search user..."
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
          />

          <div className="dropdown-list">
            {filteredUsers.map(user => (
              <div
                key={user.id}
                className="dropdown-item"
                onClick={() => {
                  setSelectedUser(user);
                  setUserSearch(user.fullName);
                }}
              >
                {user.fullName} ({user.email})
              </div>
            ))}
          </div>
        </div>

        {/* POLICY */}

        <div className="dropdown">
          <label>Select Policy</label>
          <input
            placeholder="Search policy..."
            value={policySearch}
            onChange={(e) => setPolicySearch(e.target.value)}
          />

          <div className="dropdown-list">
            {filteredPolicies.map(policy => (
              <div
                key={policy.id}
                className="dropdown-item"
                onClick={() => {
                  setSelectedPolicy(policy);
                  setPolicySearch(policy.name);
                }}
              >
                {policy.name} (₹{policy.basePremium})
              </div>
            ))}
          </div>
        </div>

        <button
          className="calculate-btn"
          onClick={calculate}
          disabled={loading}
        >
          {loading ? (
            <span className="loader"></span>
          ) : (
            "Calculate Premium"
          )}
        </button>

      </div>

      {/* MODAL */}

      {showModal && result && (

        <div className="modal-overlay">

          <div className="modal">

            {/* HEADER */}

            <div className="modal-header">
              <h3>Premium Calculation</h3>

              <button
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>

            {/* SCROLLABLE BODY */}

            <div className="modal-body">

              <div className="premium-highlight">
                ₹{result.finalPremium}
                <span>Final Premium</span>
              </div>

              <div className="modal-grid">

                <div className="info-card">
                  <h4>User</h4>
                  <p>{result.user.fullName}</p>
                  <p>{result.user.email}</p>
                  <p>{result.user.mobile}</p>
                </div>

                <div className="info-card">
                  <h4>Policy</h4>
                  <p>{result.policyType.name}</p>
                  <p>Base Premium: ₹{result.policyType.basePremium}</p>
                </div>

                <div className="info-card">
                  <h4>Profession</h4>
                  <p>{result.user.profession.name}</p>
                  <p>Risk Score: {result.user.profession.riskScore}</p>
                </div>

                <div className="info-card">
                  <h4>Risk</h4>
                  <span className={`risk-badge ${result.riskCategory.toLowerCase()}`}>
                    {result.riskCategory}
                  </span>
                  <p>Total Score: {result.totalRiskScore}</p>
                </div>

              </div>

              <div className="hobby-section">

                <h4>Hobbies Risk</h4>

                <div className="hobby-list">
                  {result.user.hobbies.map(h => (
                    <span key={h.id} className="hobby-chip">
                      {h.name} ({h.riskScore})
                    </span>
                  ))}
                </div>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}