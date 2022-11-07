import { ITrack, trackState } from "atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";

const ResultBox = styled.div`
  width: 500px;
  height: 500px;
  overflow: scroll;
  /* background: blue; */
  /* display: grid; */
  /* grid-template-columns: repeat(5, 1fr); */
  /* gap: 10px; */
`;

const Box = styled.div`
  /* padding: 10px; */
  width: 100%;
  height: 200px;
  /* background: red; */
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const AlbumImg = styled.div<{ image: string }>`
  width: 100px;
  height: 100px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
`;

const SpotifySearch = ({ data }: any) => {
  const [track, setTrack] = useRecoilState(trackState);
  // const setTrack = useSetRecoilState(trackState);
  // console.log(track);
  return (
    <ResultBox>
      {data.map((item: ITrack) => (
        <Box onClick={() => setTrack(item)} key={item.uri}>
          <AlbumImg image={item.albumImg} />
          <div>{item.title}</div>
          <div>{item.artists}</div>
          <div>{item.popularity}</div>
          {/* <audio src={item.preview_url} controls></audio> */}
        </Box>
      ))}
    </ResultBox>
  );
};

export default SpotifySearch;
