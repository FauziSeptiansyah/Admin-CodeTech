import { useState } from "react";
import { NavLink } from "react-router-dom";
import FetchData from "../hooks/FetchData";

export const Sidebar = () => {
  const api = import.meta.env.VITE_API;
  const token = localStorage.getItem("token");

  const [activeSection, setActiveSection] = useState(null);
  const [activeSubSection, setActiveSubSection] = useState(null);

  const { data } = FetchData({
    url: `${api}/admin/users/me`,
    token: token,
  });

  const sidebarMenu = [
    { id: 1, name: "Dashboard", icon: "ri-dashboard-fill", url: "/dashboard" },
    { id: 2, name: "Users", icon: "ri-user-fill", url: "/users" },
    { id: 3, name: "Pages", icon: "ri-home-2-fill", url: "/pages" },
    {
      id: 4,
      name: "Content",
      icon: "ri-file-text-fill",
      section: [
        { id: 1, name: "Profil", url: "/profil" },
        { id: 2, name: "Keunggulan", url: "/keunggulan" },
        { id: 3, name: "Portfolio", url: "/portfolio" },
        { id: 4, name: "Layanan", url: "/layanan" },
        {
          id: 5,
          name: "Blog",
          section: [
            { id: 1, name: "Kategori", url: "/kategori-blog" },
            { id: 2, name: "Artikel", url: "/artikel" },
          ],
        },
        {
          id: 6,
          name: "Faq",
          section: [
            { id: 1, name: "Kategori", url: "/kategori-faq" },
            { id: 2, name: "Pertanyaan", url: "/pertanyaan" },
          ],
        },
        { id: 7, name: "Kontak", url: "/kontak" },
      ],
    },
  ];

  return (
    <nav className="space-y-2 p-4 text-sm">
      {sidebarMenu.map((item) => (
        <div key={item.id}>
          {item.section ? (
            <>
              <button
                onClick={() =>
                  setActiveSection(activeSection === item.id ? null : item.id)
                }
                className="w-full flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-all"
              >
                <span className="flex items-center gap-3">
                  <i className={item.icon}></i>
                  {item.name}
                </span>
                <i
                  className={`ri-arrow-${
                    activeSection === item.id ? "down" : "right"
                  }-s-line text-xs`}
                ></i>
              </button>

              {activeSection === item.id && (
                <div className="pl-6 mt-1 space-y-1">
                  {item.section.map((sub) => (
                    <div key={sub.id}>
                      {sub.section ? (
                        <>
                          <button
                            onClick={() =>
                              setActiveSubSection(
                                activeSubSection === sub.id ? null : sub.id
                              )
                            }
                            className="w-full flex items-center justify-between text-left px-3 py-1 text-gray-700 hover:bg-gray-100 rounded-md transition-all"
                          >
                            <span className="flex items-center gap-3">
                              {sub.name}
                            </span>
                            <i
                              className={`ri-arrow-${
                                activeSubSection === sub.id ? "down" : "right"
                              }-s-line text-xs`}
                            ></i>
                          </button>

                          {activeSubSection === sub.id && (
                            <div className="pl-4 mt-1 space-y-1">
                              {sub.section.map((deep) => (
                                <NavLink
                                  key={deep.id}
                                  to={deep.url}
                                  className={({ isActive }) =>
                                    `block px-3 py-1 rounded-md hover:bg-gray-100 transition-all ${
                                      isActive
                                        ? "bg-indigo-100 text-indigo-700 font-semibold"
                                        : "text-gray-600"
                                    }`
                                  }
                                >
                                  {deep.name}
                                </NavLink>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <NavLink
                          to={sub.url}
                          className={({ isActive }) =>
                            `block px-3 py-1 rounded-md hover:bg-gray-100 transition-all ${
                              isActive
                                ? "bg-indigo-100 text-indigo-700 font-semibold"
                                : "text-gray-600"
                            }`
                          }
                        >
                          {sub.name}
                        </NavLink>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <NavLink
              to={item.url}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md transition-all ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <i className={item.icon}></i>
              {item.name}
            </NavLink>
          )}
        </div>
      ))}
    </nav>
  );
};
