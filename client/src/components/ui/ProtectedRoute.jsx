import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return <h1>Loading...</h1>;

  return isAuthenticated ? children : <Navigate to="/" replace />;
}