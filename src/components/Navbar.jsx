import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function Navbar() {
  //acessando as informações do context
  const { isLoggedIn, role } = useContext(AuthContext);

  const navigate = useNavigate();

  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");

    navigate("/login");
  }

  console.log(role);

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link to="/" className="flex">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="h-8 w-8"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
              />
              <span className="text-lg font-bold ml-2">Dev Suport</span>
            </div>
          </Link>
          <div className="flex items-center">
            {isLoggedIn === false && (
              <>
                <Link
                  to="/signup"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign up
                </Link>
                <Link
                  to="/login"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Log in
                </Link>
              </>
            )}

            {isLoggedIn === true && (
              <>
                {role === "BUSINESS" && (
                  <Link
                    to="/profile-business"
                    className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Profile
                  </Link>
                )}
                {role === "USER" && (
                  <>
                    <Link
                      to="/jobs"
                      className=" bg-gray-400 hover:bg-gray-500 text-white font-semibold py-1 px-2 rounded-lg transition duration-300"
                    >
                      Vagas
                    </Link>

                    <Link
                      to="/profile"
                      className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Profile
                    </Link>
                  </>
                )}

                <button
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
