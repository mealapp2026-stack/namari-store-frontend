import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "./Loader";

export default function ProtectedRoute() {
  const { isAuthenticated, checkingAuth } = useAuth();
  const location = useLocation();

  if (checkingAuth) return <Loader fullScreen label="Checking your session" />;
  if (!isAuthenticated) return <Navigate to="/admin/login" state={{ from: location }} replace />;
  return <Outlet />;
}
