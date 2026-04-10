import { useEffect, useState } from "react";
import { api } from "../api/axios";
import Card from "../components/Card";
import "../styles/table.css";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

type Policy = {
  id: number;
  name: string;
  basePremium: number;
  createdAt: string;
};

const PAGE_SIZE = 5;

export default function Policies() {
  const [list, setList] = useState<Policy[]>([]);
  const [page, setPage] = useState(1);
  const [sortAsc, setSortAsc] = useState(true);

  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editPremium, setEditPremium] = useState(0);

  // ---------- load ----------
  const loadData = () => {
    api.get("/policies").then(res => setList(res.data));
  };

  useEffect(() => {
    loadData();
  }, []);

  // ---------- helpers ----------
  const sorted = [...list].sort((a, b) =>
    sortAsc
      ? a.basePremium - b.basePremium
      : b.basePremium - a.basePremium
  );

  const start = (page - 1) * PAGE_SIZE;
  const paginated = sorted.slice(start, start + PAGE_SIZE);
  const totalPages = Math.ceil(list.length / PAGE_SIZE);

  // ---------- actions ----------
  const deletePolicy = (id: number) => {
    api.delete(`/policies/${id}`).then(loadData);
  };

  const startEdit = (p: Policy) => {
    setEditId(p.id);
    setEditName(p.name);
    setEditPremium(p.basePremium);
  };

  const saveEdit = () => {
    api
      .put(`/policies/${editId}`, {
        name: editName,
        basePremium: editPremium,
      })
      .then(() => {
        setEditId(null);
        loadData();
      });
  };

  return (
    <Card>
      <h2>Policies</h2>

      <button onClick={() => setSortAsc(!sortAsc)}>
        Sort by Premium {sortAsc ? "⬆️" : "⬇️"}
      </button>

      <br />
      <br />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Base Premium</th>
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

              <td>
                {editId === p.id ? (
                  <input
                    type="number"
                    value={editPremium}
                    onChange={e => setEditPremium(Number(e.target.value))}
                  />
                ) : (
                  p.basePremium
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
                      onClick={() => deletePolicy(p.id)}
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
