import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import client from "../api/client";
import { useDispatch } from "react-redux";
import { updateProfile, updateAuthStatus } from "../store/auth";

export const useTokenExchange = (
  setIsExchanging: (val: boolean) => void
) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setIsExchanging(false);
      return;
    }

    setIsExchanging(true);

    const exchangeToken = async () => {
      try {
        const { data } = await client.post("/auth/exchange-token", { token });
        dispatch(updateProfile(data.profile));
        dispatch(updateAuthStatus("authenticated"));

        // Clean URL
        const url = new URL(window.location.href);
        url.searchParams.delete("token");
        url.searchParams.delete("profile");
        navigate(url.pathname + url.search, { replace: true });
      } catch (error) {
        console.error("Token exchange failed:", error);
        dispatch(updateAuthStatus("unauthenticated"));
        navigate("/", { replace: true });
      } finally {
        setIsExchanging(false);
      }
    };

    exchangeToken();
  }, [searchParams, navigate, dispatch, setIsExchanging]);
};
