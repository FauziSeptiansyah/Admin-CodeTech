import { Link } from "react-router";
import FetchData from "../hooks/FetchData";

export const Navbar = ({ onToggleSidebar }) => {
  const api = import.meta.env.VITE_API;
  const token = localStorage.getItem("token");

  const { data, error } = FetchData({
    url: `${api}/admin/users/me`,
    token: token,
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Tombol hamburger (tampil hanya di mobile) */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={onToggleSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>

        {/* Logo Brand */}
        <Link
          to="/dashboard"
          className="text-2xl font-bold text-gray-800 tracking-tight hover:text-blue-600 transition duration-300"
        >
          CODETECH
        </Link>

        {/* User Info Dropdown */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="flex items-center space-x-3 cursor-pointer"
          >
            {/* Mobile view: hanya nama */}
            <img
              src={`${import.meta.env.VITE_IMG + data?.data?.profile}`}
              className="md:hidden w-9 h-9 rounded-full flex items-center justify-center"
              alt=""
            />

            {/* Desktop view: avatar + nama */}
            <div className="hidden md:flex items-center space-x-3">
              <img
                src={`${import.meta.env.VITE_IMG + data?.data?.profile}`}
                className="w-9 h-9 rounded-full flex items-center justify-center"
                alt=""
              />
              <span className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
                {data?.data?.name || "User"}
              </span>
            </div>
          </div>

          <ul
            tabIndex={0}
            className="dropdown-content z-[60] mt-3 w-56 bg-white rounded-md shadow-lg menu p-2"
          >
            <li className="px-auto py-2 border-b">
              <div className="flex items-center space-x-3">
                <img
                  src={`${import.meta.env.VITE_IMG + data?.data?.profile}`}
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  alt=""
                />
                <div className="flex flex-col">
                  <p className="text-sm font-semibold text-gray-800">
                    {data?.data?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {data?.data?.role || "Role"}
                  </p>
                </div>
              </div>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="text-sm text-start w-full text-red-600 hover:text-red-800 transition"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Error jika gagal ambil user */}
      {error && (
        <div className="text-center bg-red-100 text-red-700 text-sm py-2">
          {error}
        </div>
      )}
    </header>
  );
};
