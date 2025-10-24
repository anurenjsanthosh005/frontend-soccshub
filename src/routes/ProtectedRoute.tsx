import React, { useEffect, type PropsWithChildren } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }: PropsWithChildren) {
  const { user,loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) return null;

  return <>{children}</>;
}

export default ProtectedRoute;
