import { useEffect, useState } from "react";
import { api } from "../api/axios";
import Card from "../components/Card";
import "../styles/table.css";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";


type Profession = {
  id: number;
  name: string;
  riskScore: number;
  createdAt: string;
};

const PAGE_SIZE = 5;

export default function Professions() {
  const [list, setList] = useState<Profession[]>([]);
  const [page, setPage] = useState(1);
  const [sortAsc, setSortAsc] = useState(true);

  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editRisk, setEditRisk] = useState(0);

  const loadData = () => {
    api.get("/professions").then(res => setList(res.data));
  };

  useEffect(() => {
    loadData();
  }, []);

  // ---------- helpers ----------
  const sorted = [...list].sort((a, b) =>
    sortAsc ? a.riskScore - b.riskScore : b.riskScore - a.riskScore
  );

  const start = (page - 1) * PAGE_SIZE;
  const paginated = sorted.slice(start, start + PAGE_SIZE);
  const totalPages = Math.ceil(list.length / PAGE_SIZE);

  const riskColor = (risk: number) => {
    if (risk > 25) return "red";
    if (risk >= 10) return "orange";
    return "green";
  };

  // ---------- actions ----------
  const deleteProfession = (id: number) => {
    api.delete(`/professions/${id}`).then(loadData);
  };

  const startEdit = (p: Profession) => {
    setEditId(p.id);
    setEditName(p.name);
    setEditRisk(p.riskScore);
  };

  const saveEdit = () => {
    api.put(`/professions/${editId}`, {
      name: editName,
      riskScore: editRisk,
    }).then(() => {
      setEditId(null);
      loadData();
    });
  };

  return (
    <Card>
      <h2>Professions</h2>

      <button onClick={() => setSortAsc(!sortAsc)}>
        Sort by Risk {sortAsc ? "⬆️" : "⬇️"}
      </button>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Risk Score</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {paginated.map(p => (
            <tr key={p.id}>
              <td>
                {editId === p.id ? (
                  <input
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                  />
                ) : (
                  p.name
                )}
              </td>

              <td style={{ color: riskColor(p.riskScore), fontWeight: "bold" }}>
                {editId === p.id ? (
                  <input
                    type="number"
                    value={editRisk}
                    onChange={e => setEditRisk(Number(e.target.value))}
                  />
                ) : (
                  p.riskScore
                )}
              </td>

              <td>{new Date(p.createdAt).toLocaleString()}</td>

              <td style={{ display: "flex", gap: 35 }}>
                {editId === p.id ? (
                  <>
                    <FaSave
                      title="Save"
                      style={{ cursor: "pointer", color: "green" }}
                      onClick={saveEdit}
                    />
                    <FaTimes
                      title="Cancel"
                      style={{ cursor: "pointer", color: "gray" }}
                      onClick={() => setEditId(null)}
                    />
                  </>
                ) : (
                  <>
                    <FaEdit
                      title="Edit"
                      style={{ cursor: "pointer", color: "#1976d2" }}
                      onClick={() => startEdit(p)}
                    />
                    <FaTrash
                      title="Delete"
                      style={{ cursor: "pointer", color: "red" }}
                      onClick={() => deleteProfession(p.id)}
                    />
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{ marginTop: 12 }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          ⬅ Prev
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {page} of {totalPages}
        </span>

        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next ➡
        </button>
      </div>
    </Card>
  );
}
