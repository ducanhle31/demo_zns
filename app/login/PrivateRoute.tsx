"use client";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const navigator = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigator("/login");
    }
  }, [user, navigator]);

  return <> {user ? children : null}</>;
};

export default PrivateRoute;
