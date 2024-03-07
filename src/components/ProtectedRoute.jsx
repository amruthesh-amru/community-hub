import React from "react";
import { Navigate } from "react-router";

function ProtectedRoute({ children, user }) {
  return user ? children : <Navigate to="/signup"></Navigate>;
}

export default ProtectedRoute;
