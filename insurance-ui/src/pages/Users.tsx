import { useEffect, useState } from "react";
import { api } from "../api/axios";
import Card from "../components/Card";
import "../styles/user.css";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


type Profession = {
  id: number;
  name: string;
};

type Hobby = {
  id: number;
  name: string;
};

type User = {
  id: number;
  fullName: string;
  gender: string;
  email: string;
  dateOfBirth: string;
  mobile: string;
  profession: { id: number };
  hobbies: Hobby[];
};

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "MALE",
    email: "",
    mobile: "",
    professionId: "",
    hobbyIds: [] as number[],
  });

  useEffect(() => {
    loadUsers();
    loadDropdowns();
  }, []);

  const loadUsers = () => {
    api.get("/users").then(res => setUsers(res.data));
  };

  const loadDropdowns = () => {
    api.get("/professions").then(res => setProfessions(res.data));
    api.get("/hobbies").then(res => setHobbies(res.data));
  };

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleHobbyChange = (id: number) => {
    setForm(prev => ({
      ...prev,
      hobbyIds: prev.hobbyIds.includes(id)
        ? prev.hobbyIds.filter(h => h !== id)
        : [...prev.hobbyIds, id],
    }));
  };

  const openCreate = () => {
    setEditingId(null);
    setForm({
      fullName: "",
      dateOfBirth: "",
      gender: "MALE",
      email: "",
      mobile: "",
      professionId: "",
      hobbyIds: [],
    });
    setShowForm(true);
  };

  const openEdit = (user: User) => {
    setEditingId(user.id);
    setForm({
      fullName: user.fullName,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      email: user.email,
      mobile: user.mobile,
      professionId: String(user.profession?.id || ""),
      hobbyIds: user.hobbies.map(h => h.id),
    });
    setShowForm(true);
  };

  const saveUser = () => {
    if (editingId) {
      api.put(`/users/${editingId}`, form).then(() => {
        setShowForm(false);
        loadUsers();
      });
    } else {
      api.post("/users", form).then(() => {
        setShowForm(false);
        loadUsers();
      });
    }
  };

  const deleteUser = (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      api.delete(`/users/${id}`).then(loadUsers);
    }
  };

  return (
    <Card>
      <div className="users-header">
        <h2>Users</h2>
        <button className="create-btn" onClick={openCreate}>
          + Create User
        </button>
      </div>

      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.fullName}</td>
              <td>
                <span className={`badge ${u.gender.toLowerCase()}`}>
                  {u.gender}
                </span>
              </td>
              <td>{u.email}</td>
              <td className="action-icons">
                <FaEye
                  className="view-icon"
                  onClick={() => navigate(`/users/${u.id}`)}
                />
                <FaEdit
                  className="edit-icon"
                  onClick={() => openEdit(u)}
                />
                <FaTrash
                  className="delete-icon"
                  onClick={() => deleteUser(u.id)}
                />
              </td>

            </tr>
          ))}
        </tbody>
      </table>

      {showForm && <div className="overlay" onClick={() => setShowForm(false)} />}

      <div className={`drawer ${showForm ? "open" : ""}`}>
        <h3>{editingId ? "Edit User" : "Create User"}</h3>

        <div className="form-group">
          <label>Full Name</label>
          <input name="fullName" value={form.fullName} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Date of Birth</label>
          <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select name="gender" value={form.gender} onChange={handleChange}>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input name="email" value={form.email} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Mobile</label>
          <input name="mobile" value={form.mobile} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Profession</label>
          <select name="professionId" value={form.professionId} onChange={handleChange}>
            <option value="">Select Profession</option>
            {professions.map(p => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Hobbies</label>
          <div className="checkbox-group">
            {hobbies.map(h => (
              <label key={h.id} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={form.hobbyIds.includes(h.id)}
                  onChange={() => handleHobbyChange(h.id)}
                />
                {h.name}
              </label>
            ))}
          </div>
        </div>

        <div className="drawer-buttons">
          <button className="save-btn" onClick={saveUser}>
            {editingId ? "Update" : "Save"}
          </button>
          <button className="cancel-btn" onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </div>
      </div>
    </Card>
  );
}
