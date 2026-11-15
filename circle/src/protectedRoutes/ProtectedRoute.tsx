import { useContext, useEffect, useState, type ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../contexts/authContext";
import AuthServices from "../services/authServices";

type ProtectedRouteProps = {
  children: ReactElement;
};

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const { isLoggedIn, setIsLoggedIn } = useContext(authContext);

  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    async function checkToken() {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoggedIn(null);
        setIsChecking(false);
        return;
      }

      try {
        await AuthServices.getUserData();
        setIsLoggedIn(token);
      } catch (error) {
        localStorage.removeItem("token");
        setIsLoggedIn(null);
      } finally {
        setIsChecking(false);
      }
    }

    checkToken();
  }, []);

  if (isChecking) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}