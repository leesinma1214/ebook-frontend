import { type FC } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";

const Private: FC = () => {
  const { status } = useAuth();
  const notLoggedIn = status === "unauthenticated";

  const busy = status === "busy";

  if (busy) return <LoadingSpinner />;

  return notLoggedIn ? <Navigate to="/sign-up" /> : <Outlet />;
};

export default Private;
