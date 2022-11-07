import useAuth from "useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import React, { useEffect, useState } from "react";
import Player from "./Player";
import { useRecoilValue } from "recoil";
import { trackState } from "atom";
import SpotifySearch from "components/SpotifySearch";
import styled from "styled-components";

const PlayList = styled.div``;

const Img = styled.div<{ bgPhoto: string }>`
  width: 100px;
  height: 100px;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center;
`;

const Title = styled.p``;

const Description = styled.p``;

interface IProps {
  code: string;
}

interface IAPI {
  title: string | null;
  artists: string | null;
  preview_url: string | null;
  popularity: number | null;
  albumImg: string | null;
  uri: string;
}

interface IPlay {
  items: [
    {
      description: string;
      name: string;
      images: [{ height: number; url: string; width: number }];
      uri: string;
      tracks: {
        href: string;
      };
    }
  ];
}

const Spotify = ({ code }: IProps) => {
  const accessToken = useAuth(code);
  const spotifyApi = new SpotifyWebApi({
    accessToken,
  });
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<IAPI[] | undefined>([]);
  const [playList, setPlayList] = useState<IPlay | null>();
  const track = useRecoilValue(trackState);

  useEffect(() => {
    //액세스 토큰을 계속 갱신하기 때문에 갱신할 때마다 새로운 값을 넣어줌
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    // console.log(accessToken);
    const userProfile = async () => {
      const response = await fetch("https://api.spotify.com/v1/me/playlists", {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      setPlayList(data);
    };
    userProfile();
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    if (!search) return setSearchResult([]);

    const result = async () => {
      // async/await으로 promise result 값 가져오기
      const data = await spotifyApi.searchTracks(search).then((res) => {
        // data 변수 안에서 결과값 리턴
        return res.body?.tracks?.items?.map((item) => {
          // map 함수 내에서 return
          return {
            title: item.name,
            artists: item.artists[0].name,
            preview_url: item.preview_url,
            popularity: item.popularity,
            albumImg: item.album.images[0].url,
            uri: item.uri,
          };
        });
      });
      // map 함수로 arr 한 번 풀어주기...
      setSearchResult(() => data?.map((data) => data));
    };

    result();
  }, [search, accessToken]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(e.currentTarget.search.value);
  };
  return (
    <div>
      {/* <form onSubmit={(e) => onSubmit(e)}>
        <input
          type="search"
          name="search"
          // value={search}
          // onChange={(e) => setSearch(e.target.value)}
          placeholder="search song"
        />
        <input type="submit" value="search" />
      </form> */}

      {/* <SpotifySearch data={searchResult} /> */}
      <PlayList>
        {playList?.items.map((item) => (
          <>
            <Img bgPhoto={item.images[0].url}></Img>
            <Title>{item.name}</Title>
            <Description>{item.description}</Description>
          </>
        ))}
      </PlayList>
      {/* <p>{playList?.items[0].name} play list</p> */}
      {/* <p>{playList?.items[0].description}</p> */}
      <Player
        accessToken={accessToken}
        track={track.uri || playList?.items[0].uri}
      />
    </div>
  );
};

export default Spotify;
