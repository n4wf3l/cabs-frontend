import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT
  console.log("🔍 Role from JWT:", payload.role);

  if (!allowedRoles.includes(payload.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
