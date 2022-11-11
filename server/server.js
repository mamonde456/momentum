import "dotenv/config";
import express from "express";
import cors from "cors";
import SpotifyWebApi from "spotify-web-api-node";
import path from "path";

const app = express();
const PORT = 5000 || process.env.PORT;
const CORSLIST = [
  process.env.REDIRECT_URI,
  process.env.REDIRECT_URI2,
  process.env.REDIRECT_URI3,
];

const corsOptions = {
  origin: function (origin, callback) {
    if (CORSLIST.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed Origin!"));
    }
  },
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));

app.post("/api", async (req, res) => {
  const {
    body: { code },
  } = req;

  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
        status: data.statusCode,
      });
    })
    .catch((err) => {
      return res.sendStatus(400);
    });
});

app.post("/api/refresh", (req, res) => {
  const {
    body: { refreshToken },
  } = req;
  console.log(refreshToken);
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      return res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log("refresh error " + err);
      return res.sendStatus(400);
    });
});

app.use(express.static(path.join(__dirname + "/client/build")));

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname + "/client/build", "index.html"))
);

app.listen(PORT, () =>
  console.log(`server listening to http://localhost:${PORT} 🚀`)
);