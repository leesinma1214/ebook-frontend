import { type FC } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const Author: FC = () => {
  const { profile } = useAuth();
  const isAuthor = profile?.role === "author";

  return isAuthor ? <Outlet /> : <Navigate to="/not-found" />;
};

export default Author;