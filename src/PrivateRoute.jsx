import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./services/Firebase";

function PrivateRoute({ Component }) {
  const [user] = useAuthState(auth);

  return user ? <Component /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
