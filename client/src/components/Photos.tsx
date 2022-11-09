import { useEffect, useState } from "react";
import styled from "styled-components";
const TitleBox = styled.div`
  margin-bottom: 30px;
`;

const Title = styled.p`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const BgList = styled.ul`
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;
const Bg = styled.li`
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  border: solid 2px rgba(0, 0, 0, 0.3);
  background-color: rgba(155, 202, 188, 0.3);
`;

const Photos = () => {
  const [bgPhoto, setBgPhoto] = useState<string | undefined>("");
  const [count, setCount] = useState(0);
  const clickCnt = (text: string) => {
    setBgPhoto(text);
    setCount(count + 1);
    console.log(count);
  };

  useEffect(() => {
    if (count < 3) {
      window.localStorage.setItem("bgPhoto", String(bgPhoto));
    }
  }, [bgPhoto]);

  useEffect(() => {
    if (count > 3) return;
    const hours = setTimeout(() => {
      setCount(0);
    }, 1000 * 60 * 60);

    return () => clearTimeout(hours);
  }, []);

  return (
    <>
      <TitleBox>
        <Title>Photos</Title>
        <p style={{ opacity: 0.8 }}>
          Choose a new genre of background images. You can't change it more than
          three times.
        </p>
      </TitleBox>
      {count >= 2 && (
        <p
          style={{
            opacity: 0.5,
            fontSize: 14,
            marginBottom: 20,
            color: "red",
          }}
        >
          Image can no longer be loaded! Please request again in an hour!
        </p>
      )}
      <BgList>
        <Bg onClick={() => clickCnt("nature")}>Nature</Bg>
        <Bg onClick={() => clickCnt("architecture-interiors")}>
          Architecture & Interiors
        </Bg>
        <Bg onClick={() => clickCnt("fashion-beauty")}>Fashion & Beauty</Bg>
        <Bg onClick={() => clickCnt("food-drink")}>Food & Drink</Bg>
        <Bg onClick={() => clickCnt("film")}>Film</Bg>
        <Bg onClick={() => clickCnt("people")}>People</Bg>
        <Bg onClick={() => clickCnt("athletics")}>Athletics</Bg>
        <Bg onClick={() => clickCnt("street-photograhy")}>Street Photograhy</Bg>
      </BgList>{" "}
    </>
  );
};

export default Photos;
