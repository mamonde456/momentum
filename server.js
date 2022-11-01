import "dotenv/config";
import express from "express";
import cors from "cors";
import SpotifyWebApi from "spotify-web-api-node";

const app = express();
const PORT = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.post("/api", (req, res) => {
  console.log(req.body);
  return res.json(req.body);
});

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

app.get("/login", (req, res) => {
  const apiUrl = "https://accounts.spotify.com/authorize?";
  const config = {
    client_id: process.env.CLIENTID,
    client_secret: process.env.CLIENTSECRET,
    redirect_uri: "http://localhost:3000",
    scope: "user-read-private user-read-email playlist-read-private",
  };
  const params = new URLSearchParams(config).toString();
  return res.redirect(`${apiUrl}${params}`);
});

app.listen(PORT, () =>
  console.log(`server listening to http://localhost:${PORT} 🚀`)
);
