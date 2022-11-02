import Login from "Login";
import React from "react";
import Spotify from "Spotify";
import Router from "./Router";

const code = new URLSearchParams(window.location.search).get("code");
const state = new URLSearchParams(window.location.search).get("state");

function App() {
  const codes = {
    code: code as string,
    state: state as string,
  };
  return (
    <>
      <Router />
      {code ? <Spotify codes={codes} /> : <Login />}
    </>
  );
}

export default App;
