import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../../provider/auth";
import SkeletonLoading from "../SkeletonLoading";

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { getUserInfo } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const userInfo = await getUserInfo();
      setIsAuthenticated(!!userInfo);
    };

    checkAuth();
  }, [getUserInfo]);

  // Still checking authentication status
  if (isAuthenticated === null) {
    return <SkeletonLoading />;
  }

  // Not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Authenticated, render children
  return children;
};

export default ProtectedRoute;
