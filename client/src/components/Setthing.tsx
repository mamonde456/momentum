import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
`;

const Settingicon = styled.svg`
  width: 30px;
  height: 30px;
  position: absolute;
  bottom: 0;
  left: 30px;
  fill: white;
  opacity: 0.8;
`;

const SettingList = styled.div`
  width: 500px;
  height: 600px;
  padding: 10px 50px;
  position: absolute;
  bottom: 70px;
  left: 0;
  background-color: white;
  border-radius: 10px;
  color: black;
`;
const Arrow = styled.div`
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-bottom: 20px solid transparent;
  border-top: 20px solid white;
  border-right: 15px solid transparent;
  position: absolute;
  bottom: -40px;
  left: 30px;
`;

const BgList = styled.ul`
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;
const Bg = styled.li`
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  border: solid 2px rgba(0, 0, 0, 0.3);
  background-color: rgba(155, 202, 188, 0.3);
`;

const Setting = () => {
  const [bgPhoto, setBgPhoto] = useState<string | undefined>("");
  const [count, setCount] = useState(0);
  const [click, setClick] = useState(false);

  useEffect(() => {
    if (count < 3) {
      window.localStorage.setItem("bgPhoto", String(bgPhoto));
      setCount(count + 1);
    }
  }, [bgPhoto]);
  return (
    <Wrapper>
      <Settingicon
        onClick={() => setClick((prev) => !prev)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336c44.2 0 80-35.8 80-80s-35.8-80-80-80s-80 35.8-80 80s35.8 80 80 80z" />
      </Settingicon>
      {click && (
        <SettingList>
          <p style={{ fontSize: 36, fontWeight: 500, marginBottom: 30 }}>
            Photos
          </p>
          {count === 2 && (
            <p>
              Image can no longer be loaded! Please request again in an hour!
            </p>
          )}
          <BgList>
            <Bg onClick={() => setBgPhoto("nature")}>Nature</Bg>
            <Bg onClick={() => setBgPhoto("architecture-interiors")}>
              Architecture & Interiors
            </Bg>
            <Bg onClick={() => setBgPhoto("fashion-beauty")}>
              Fashion & Beauty
            </Bg>
            <Bg onClick={() => setBgPhoto("food-drink")}>Food & Drink</Bg>
            <Bg onClick={() => setBgPhoto("film")}>Film</Bg>
            <Bg onClick={() => setBgPhoto("people")}>People</Bg>
            <Bg onClick={() => setBgPhoto("athletics")}>Athletics</Bg>
            <Bg onClick={() => setBgPhoto("street-photograhy")}>
              Street Photograhy
            </Bg>
          </BgList>
          <Arrow />
        </SettingList>
      )}
    </Wrapper>
  );
};

export default Setting;
