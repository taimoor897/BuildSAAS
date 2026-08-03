import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ 
  children,
  allowedRoles
}) {

  const { loading, user, isAuthenticated } = useAuth();


  if (loading) {
    return <h1>Loading...</h1>;
  }


  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }


  if (
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/inventory" replace />;
  }


  return children;
}