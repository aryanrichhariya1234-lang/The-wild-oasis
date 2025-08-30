import { useNavigate } from "react-router-dom";
import UseUser from "../features/authentication/UseUser";
import Spinner from "./Spinner";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isPending, isAuthenticated } = UseUser();

  useEffect(
    function () {
      if (!isAuthenticated && !isPending) navigate("/login");
    },
    [navigate, isAuthenticated, isPending]
  );
  if (isPending) return <Spinner />;
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
