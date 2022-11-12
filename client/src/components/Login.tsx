import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const SpotifyBtn = styled.a`
  color: white;
  display: block;
  padding: 10px;
  /* background-color: white; */
  border-radius: 10px;
  border: solid 1px white;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Icon = styled.svg`
  width: 30px;
  height: 30px;
  fill: white;
`;

const Login = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const generateRandomString = (num: number) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < num; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  };

  const apiUrl = process.env.REACT_APP_API_URL;
  let state = generateRandomString(16);
  const redirect_uri = process.env.REACT_APP_SERVER_API_URL || "";
  // const config = {
  //   client_id: process.env.REACT_APP_CLIENT_ID || "",
  //   client_secret: process.env.REACT_APP_CLIENT_SECRET || "",
  //   response_type: "code",
  // redirect_uri:"", // uri 결과값이 변환되어 나옴.
  //   scope:
  //     "streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state playlist-read-collaborative user-read-currently-playing playlist-read-private playlist-modify-public playlist-modify-private",
  //   state,
  // };
  // const params = new URLSearchParams(config).toString();
  const params = `client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&redirect_uri=${redirect_uri}&response_type=code&scope=streaming+user-read-email+user-read-private+user-library-read+user-library-modify+user-read-playback-state+user-modify-playback-state+playlist-read-collaborative+user-read-currently-playing+playlist-read-private+playlist-modify-public+playlist-modify-private&state=${state}`;

  return (
    <SpotifyBtn href={`${apiUrl}${params}`}>
      <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
        <path d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z" />
      </Icon>
      Spotify Log In
    </SpotifyBtn>
  );
};

export default Login;
