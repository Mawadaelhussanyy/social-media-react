import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../contexts/authContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(authContext);

  function logout() {
    localStorage.removeItem("token");
    setIsLoggedIn(null);
    navigate("/signin");
  }

  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b">
      <h1 className="text-xl font-bold">
        My Website
      </h1>

      <div className="flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/post">Add Post</Link>
        <Link to="/profile">Profile</Link>
      </div>

      <div className="flex gap-3">
        <Link
          to="/signin"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Sign In
        </Link>

        <Link
          to="/signup"
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Sign Up
        </Link>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}