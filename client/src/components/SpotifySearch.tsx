import { ITrack, trackState } from "atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";

const ResultBox = styled.div`
  width: 100%;
  height: 500px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 30px;
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

const Title = styled.p`
  padding: 10px;
  font-size: 26px;
  margin-bottom: 30px;
`;
const Box = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 10px;
  cursor: pointer;
  .title {
    font-size: 18px;
    font-weight: 700;
  }
  .pop {
    font-size: 12px;
    color: red;
  }
`;

const Text = styled.p`
  margin-bottom: 10px;
`;
const Icon = styled.svg`
  width: 20px;
  height: 20px;
  fill: red;
`;

const AlbumImg = styled.div<{ image: string }>`
  width: 100px;
  height: 100px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
`;

const SpotifySearch = ({ data }: any) => {
  // const [track, setTrack] = useRecoilState(trackState);
  const setTrack = useSetRecoilState(trackState);
  // console.log(track);
  return (
    <ResultBox>
      <Title>Song</Title>
      {data?.length === 0 ? (
        <div>nothing found</div>
      ) : (
        <>
          {data.map((item: ITrack) => (
            <Box onClick={() => setTrack(item)} key={item.uri}>
              <AlbumImg image={item.albumImg || ""} />
              <div>
                <Text className="title">{item.title}</Text>
                <Text>{item.artists}</Text>
                <div style={{ display: "flex", gap: 10, opacity: 0.5 }}>
                  <Icon
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z" />
                  </Icon>
                  <Text className="pop">{item.popularity}</Text>
                </div>
              </div>
            </Box>
          ))}
        </>
      )}
    </ResultBox>
  );
};

export default SpotifySearch;
