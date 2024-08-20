import { ReactNode, useEffect } from "react";
import { useIsAuthenticated } from "../hook/useisAuthenticated";
import { useNavigate } from "react-router-dom";
import Spinner from "../Util/Spinner";

interface ProtectRouteProps {
  children: ReactNode;
}

function ProtectRoute({ children }: ProtectRouteProps) {
  const { isLoading, isAuthenticated } = useIsAuthenticated();
  const navigate = useNavigate();
  console.log(isAuthenticated);
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return <Spinner />;

  if (isAuthenticated) {
    return children;
  }
}

export default ProtectRoute;
