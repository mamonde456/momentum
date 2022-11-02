import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const generateRandomString = (num: number) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < num; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

const Login = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const apiUrl = process.env.REACT_APP_API_URL;
  let state = generateRandomString(16);
  const config = {
    client_id: process.env.REACT_APP_CLIENT_ID,
    client_secret: process.env.REACT_APP_CLIENT_SECRET,
    redirect_uri: "http://localhost:3000",
    response_type: "code",
    scope:
      "streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state",
    state,
  };
  const params = new URLSearchParams(config).toString();
  console.log(apiUrl, params);
  return (
    <div>
      <a href={`${apiUrl}${params}`}>click spotify</a>
    </div>
  );
};

export default Login;
