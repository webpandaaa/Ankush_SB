import "../styles/sidebar.css";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">INSURE+</div>

      <nav>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/professions">Professions</NavLink>
        <NavLink to="/hobbies">Hobbies</NavLink>
        <NavLink to="/policies">Policies</NavLink>
        <NavLink to="/calculate">Premium Calculator</NavLink>
      </nav>
    </div>
  );
}
