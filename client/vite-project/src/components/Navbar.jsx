import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };
  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          MERN App
        </Link>

        {/* Navigation */}
        <div className="flex gap-6">
          <Link to="/" className="hover:text-blue-200">
            Home
          </Link>

          <Link to="/login" className="hover:text-blue-200">
            Login
          </Link>

          <Link to="/register" className="hover:text-blue-200">
            Register
          </Link>
          {user && (
            <Link
              to={`/updatePassword/${user.id}`}
              className="hover:text-blue-200"
            >
              Update Password
            </Link>
          )}
          {user && <button onClick={handleLogout}>Logout</button>}
          {user && (
            <Link
              to={`/deleteaccount/${user.id}`}
              className="hover:text-red-200"
            >
              Delete Account
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
