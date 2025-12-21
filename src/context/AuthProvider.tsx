import { type FC, type ReactNode, useEffect, useState } from "react";
import { updateAuthStatus, updateProfile } from "../store/auth";
import { getAuthState } from "../store";
import client from "../api/client";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "./AuthContext";
import { useTokenExchange } from "../hooks/useTokenExchange";

interface Props {
  children: ReactNode;
}

const AuthProvider: FC<Props> = ({ children }) => {
  const { profile, status } = useSelector(getAuthState);
  const dispatch = useDispatch();
  const [isExchangingToken, setIsExchangingToken] = useState(false);

  // Pass setter to token exchange hook so it can signal when it's done
  useTokenExchange(setIsExchangingToken);

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
    // Don't fetch profile if we're exchanging a token
    if (isExchangingToken) return;
    if (new URLSearchParams(window.location.search).has("token")) return;

    client
      .get("/auth/profile")
      .then(({ data }) => {
        dispatch(updateProfile(data.profile));
        dispatch(updateAuthStatus("authenticated"));
      })
      .catch((error) => {
        // Ignore 401 errors during token exchange process
        if (error?.response?.status === 401 && isExchangingToken) {
          return;
        }
        dispatch(updateProfile(null));
        dispatch(updateAuthStatus("unauthenticated"));
      });
  }, [dispatch, isExchangingToken]);

  return (
    <AuthContext.Provider value={{ profile, status, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
