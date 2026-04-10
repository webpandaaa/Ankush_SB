import { useEffect, useState } from "react";
import { api } from "../api/axios";
import Card from "../components/Card";
import "../styles/table.css";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

type Hobby = {
  id: number;
  name: string;
  riskScore: number;
  createdAt: string;
};

const PAGE_SIZE = 5;

export default function Hobbies() {
  const [list, setList] = useState<Hobby[]>([]);
  const [page, setPage] = useState(1);
  const [sortAsc, setSortAsc] = useState(true);

  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editRisk, setEditRisk] = useState(0);

  // ---------- load ----------
  const loadData = () => {
    api.get("/hobbies").then(res => setList(res.data));
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
  const deleteHobby = (id: number) => {
    api.delete(`/hobbies/${id}`).then(loadData);
  };

  const startEdit = (h: Hobby) => {
    setEditId(h.id);
    setEditName(h.name);
    setEditRisk(h.riskScore);
  };

  const saveEdit = () => {
    api
      .put(`/hobbies/${editId}`, {
        name: editName,
        riskScore: editRisk,
      })
      .then(() => {
        setEditId(null);
        loadData();
      });
  };

  return (
    <Card>
      <h2>Hobbies</h2>

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
          {paginated.map(h => (
            <tr key={h.id}>
              <td>
                {editId === h.id ? (
                  <input
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                  />
                ) : (
                  h.name
                )}
              </td>

              <td style={{ color: riskColor(h.riskScore), fontWeight: "bold" }}>
                {editId === h.id ? (
                  <input
                    type="number"
                    value={editRisk}
                    onChange={e => setEditRisk(Number(e.target.value))}
                  />
                ) : (
                  h.riskScore
                )}
              </td>

              <td>{new Date(h.createdAt).toLocaleString()}</td>

              <td style={{ display: "flex", gap: 35 }}>
                {editId === h.id ? (
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
                      onClick={() => startEdit(h)}
                    />
                    <FaTrash
                      title="Delete"
                      style={{ cursor: "pointer", color: "red" }}
                      onClick={() => deleteHobby(h.id)}
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
