import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Navbar({ title, aboutText, mode, toggleMode }) {
  // Define reusable styles
  const textColor = mode === "light" ? "black" : "white";
  const bgColor = mode === "light" ? "white" : "black";

  return (
    <nav className={`bg-${mode}-800 shadow-md`}>
      <div className="max-w-7xl px-2">
        <div className="relative flex h-14 items-center justify-center">
          {/* Logo Section */}
          <div className="flex flex-1 items-center justify-between">
            <div className="flex items-center">
              <Link
                to="/"
                className={`text-${textColor} text-3xl font-semibold tracking-wide`}
              >
                {title}
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-4 ml-4">
            <Link
              to="/"
              className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
              aria-current="page"
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`rounded-md px-3 py-2 text-sm font-medium text-${textColor} hover:bg-gray-700 hover:text-white`}
            >
              {aboutText}
            </Link>

            {/* Toggle Mode Button */}
            <button
              onClick={toggleMode}
              className={`border rounded-md px-2 py-1 bg-${bgColor} text-${textColor} text-xs ml-8 border-2`}
            >
              {mode === "light" ? "Dark" : "Light"} Mode
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Define PropTypes
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  aboutText: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  toggleMode: PropTypes.func.isRequired,
};


export default Navbar;
