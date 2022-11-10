import useAuth from "useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import React, { useEffect, useState } from "react";
import Player from "./Player";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { trackState } from "atom";
import SpotifySearch from "components/SpotifySearch";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

const Title = styled.p`
  width: 110px;
  font-size: 22px;
  color: white;
  margin-bottom: 30px;
  cursor: pointer;
`;

const Wrapper = styled.div`
  position: relative;
  z-index: 2;
`;

const PlayBox = styled(motion.div)`
  width: 400px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  border: solid 1px white;
`;

const TabBtn = styled.div`
  width: 100%;
  color: white;
  background-color: rgba(0, 0, 0, 0.8);
  text-align: center;
  padding: 10px;
  border-radius: 10px;
`;

const PlayList = styled(motion.div)`
  padding: 10px;
  max-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  overflow: scroll;
  ::-webkit-scrollbar {
    width: 5px;
    height: 100%;
    background: none;
  }
  ::-webkit-scrollbar-thumb {
    background-color: black;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    background: none;
    border-radius: 10px;
  }
`;

const Img = styled.div<{ bgPhoto: string }>`
  width: 100px;
  height: 100px;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center;
`;

const Search = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 280px;
  background: none;
  border: none;
  border-bottom: solid 1px rgba(0, 0, 0, 0.5);
  padding: 10px;
  margin-right: 10px;
  &:focus {
    outline: none;
  }
`;

const SearchBtn = styled.input`
  padding: 10px;
  background-color: black;
  border-radius: 5px;
  color: white;
  cursor: pointer;
`;

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
  const [playListResult, setPlayListResult] = useState<IPlay | null>();
  const [isClick, setIsClick] = useState(false);
  const [tab, setTab] = useState(false);
  const [track, setTrack] = useRecoilState(trackState);

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
      setPlayListResult(data);
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
      setSearchResult(data);
    };

    result();
  }, [search, accessToken]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = e.currentTarget.search.value;
    if (!result) return;
    setSearch(result);
    e.currentTarget.reset();
  };
  return (
    <>
      <Title onClick={() => setIsClick((prev) => !prev)}>My playlist</Title>
      <Wrapper style={isClick ? { zIndex: 2 } : { zIndex: -1 }}>
        <AnimatePresence>
          <PlayBox
            initial={{ x: 10, opacity: 0 }}
            animate={isClick ? { x: 0, opacity: 1 } : { x: 10, opacity: 0 }}
          >
            <div style={{ display: "flex", gap: 10, marginBottom: 30 }}>
              <TabBtn onClick={() => setTab(false)}>Playlist</TabBtn>
              <TabBtn onClick={() => setTab(true)}>search</TabBtn>
            </div>
            {tab ? (
              <motion.div
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 10, opacity: 0 }}
              >
                <Search>
                  <form onSubmit={(e) => onSubmit(e)}>
                    <SearchInput
                      type="search"
                      name="search"
                      placeholder="search song"
                    />
                    <SearchBtn type="submit" value="search" />
                  </form>
                </Search>
                <SpotifySearch data={searchResult} />
              </motion.div>
            ) : (
              <PlayList
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 10, opacity: 0 }}
              >
                {playListResult?.items.map((item) => (
                  <div
                    onClick={() => setTrack({ uri: item.uri })}
                    style={{ cursor: "pointer" }}
                  >
                    <Img
                      key={item.images[0].url}
                      bgPhoto={item.images[0].url}
                    ></Img>
                    <p key={item.name}>{item.name}</p>
                    <p key={item.description}>{item.description}</p>
                  </div>
                ))}
              </PlayList>
            )}

            <Player accessToken={accessToken} track={track.uri} />
          </PlayBox>
        </AnimatePresence>
      </Wrapper>
    </>
  );
};

export default Spotify;
