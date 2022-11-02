import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = (code: string) => {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [ExpiresIn, setExpiresIn] = useState("");
  const navigator = useNavigate();

  useEffect(() => {
    axios
      .post("http://localhost:5000/api", {
        code,
      })
      .then((res) => {
        setAccessToken(res.data.access_token);
        setRefreshToken(res.data.refresh_token);
        setExpiresIn(res.data.expires_in);
        console.log(
          res.data,
          +"" + accessToken,
          +"" + refreshToken,
          +"" + ExpiresIn
        );
        window.history.pushState({}, "", "/");
      })
      .catch(() => {
        navigator("/");
      });
  }, [code]);
};

export default useAuth;
