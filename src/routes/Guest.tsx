import { type FC } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";

const Guest: FC = () => {
  const { status } = useAuth();
  const isLoggedIn = status === "authenticated";
  const busy = status === "busy";

  if (busy) return <LoadingSpinner />;

  return isLoggedIn ? <Navigate to="/profile" /> : <Outlet />;
};

export default Guest;
