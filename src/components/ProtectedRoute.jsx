// ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "./Loader.jsx"

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.User);
  const location = useLocation();

  if (loading) {
    return <Loader/>;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace state={{from:location}} />;
};



// GuestRoute.jsx

const GuestRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.User);

  if (loading) {
    return <Loader/>;
  }

  return !isAuthenticated ? children : <Navigate to="/" replace />;
};

export {ProtectedRoute, GuestRoute};
