import { type FC, type ReactNode, useEffect } from "react";
import { updateAuthStatus, updateProfile } from "../store/auth";
import { getAuthState } from "../store";
import client from "../api/client";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "./AuthContext";

interface Props {
  children: ReactNode;
}

const AuthProvider: FC<Props> = ({ children }) => {
  const { profile, status } = useSelector(getAuthState);
  const dispatch = useDispatch();

  const signOut = async () => {
    try {
      dispatch(updateAuthStatus("busy"));
      await client.post("/auth/logout");
      dispatch(updateAuthStatus("unauthenticated"));
      dispatch(updateProfile(null));
    } catch (error) {
      console.log(error);
      dispatch(updateAuthStatus("unauthenticated"));
    }
  };

  useEffect(() => {
    client
      .get("/auth/profile")
      .then(({ data }) => {
        dispatch(updateProfile(data.profile));
        dispatch(updateAuthStatus("authenticated"));
      })
      .catch(() => {
        dispatch(updateProfile(null));
        dispatch(updateAuthStatus("unauthenticated"));
      });
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{ profile, status, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
