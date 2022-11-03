import useAuth from "useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import React, { useEffect, useState } from "react";
import SpotifyBox from "SpotifyBox";

interface IProps {
  code: string;
}

interface IAPI {
  title: string | null;
  artists: string | null;
  preview_url: string | null;
  popularity: number | null;
  albumImg: string | null;
}

const Spotify = ({ code }: IProps) => {
  const accessToken = useAuth(code);
  const spotifyApi = new SpotifyWebApi({
    accessToken,
  });
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<IAPI[] | undefined>([]);

  useEffect(() => {
    //액세스 토큰을 계속 갱신하기 때문에 갱신할 때마다 새로운 값을 넣어줌
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    if (!search) return setSearchResult([]);
    let cancel = false;
    const result = async () => {
      // async/await으로 promise result 값 가져오기
      const data = await spotifyApi.searchTracks(search).then((res) => {
        // data 변수 안에서 결과값 리턴
        return res.body?.tracks?.items?.map((item) => {
          console.log(item);

          // map 함수 내에서 return
          return {
            title: item.name,
            artists: item.artists[0].name,
            preview_url: item.preview_url,
            popularity: item.popularity,
            albumImg: item.album.images[0].url,
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
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type="search"
          name="search"
          // value={search}
          // onChange={(e) => setSearch(e.target.value)}
          placeholder="search song"
        />
        <input type="submit" value="search" />
      </form>
      <SpotifyBox data={searchResult} />
    </div>
  );
};

export default Spotify;
