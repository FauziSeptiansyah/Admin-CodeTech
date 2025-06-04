import { Navigate, Outlet } from "react-router";

export const ProtectedAuth = () => {
  const token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/" />;
};
