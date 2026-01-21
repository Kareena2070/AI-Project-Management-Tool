import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow px-6 py-3 flex gap-6 justify-end">
      <Link to="/dashboard" className="font-semibold">
        Dashboard
      </Link>
      <Link to="/board" className="font-semibold">
        Board
      </Link>
    </nav>
  );
}
