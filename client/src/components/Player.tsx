import { useEffect, useState } from "react";
import SpotifyWebPlayer from "react-spotify-web-playback";

const Player = ({ accessToken, track }: any) => {
  const [play, setPlay] = useState(false);
  useEffect(() => {
    setPlay(true);
  }, [track]);
  if (!accessToken) return null;
  return (
    <SpotifyWebPlayer
      token={accessToken}
      showSaveIcon
      // callback={(state) => {
      //   if (!state.isPlaying) setPlay(false);
      // }}
      uris={track}
      // play={true}
    />
  );
};

export default Player;
