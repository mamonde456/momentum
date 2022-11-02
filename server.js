import "dotenv/config";
import express from "express";
import cors from "cors";
import SpotifyWebApi from "spotify-web-api-node";
import fetch from "cross-fetch";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: "http://localhost:3000",
});
const app = express();
const PORT = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.post("/api", async (req, res) => {
  const {
    body: { code, state },
  } = req;

  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      console.log(data);
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);
    });

  // const client_id = process.env.CLIENT_ID;
  // const client_secret = process.env.CLIENT_SECRET;

  // const base64EncodedText = Buffer.from(
  //   client_id + ":" + client_secret,
  //   "utf8"
  // ).toString("base64");

  // if (state === null) {
  //   res.send("state_mismatch");
  // } else {
  //   const response = await fetch("https://accounts.spotify.com/api/token", {
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //       Authorization:
  //         "Basic" + (client_id + ":" + client_secret).toString("base64"),
  //     },
  //     body: JSON.stringify({
  //       code: code,
  //       redirect_uri: process.env.REDIRECT_URI,
  //       grant_type: "client_credentials",
  //     }),
  //   });
  //   console.log(response);
  //   const data = await response.json();
  //   console.log(data);
  // }
});

app.listen(PORT, () =>
  console.log(`server listening to http://localhost:${PORT} 🚀`)
);
