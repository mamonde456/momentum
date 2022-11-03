import styled from "styled-components";

interface IAPI {
  title: string;
  artists: string;
  preview_url: string;
  popularity: number;
  albumImg: string;
}

const ResultBox = styled.div`
  width: 500px;
  height: 800px;
  overflow: scroll;
  background: blue;
  /* display: grid; */
  /* grid-template-columns: repeat(5, 1fr); */
  /* gap: 10px; */
`;

const Box = styled.div`
  /* padding: 10px; */
  width: 100%;
  height: 200px;
  background: red;
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

const SpotifyBox = ({ data }: any) => {
  console.log(data);
  return (
    <ResultBox>
      {data.map((item: IAPI) => (
        <Box key={item.title}>
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

export default SpotifyBox;
