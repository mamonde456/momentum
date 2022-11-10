import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { transform } from "typescript";
import General from "./General";
import Photos from "./Photos";
import ToggleItem from "./ToggleItem";

const Wrapper = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
`;

const Settingicon = styled.svg`
  width: 25px;
  height: 25px;
  /* position: absolute;
  bottom: 10px;
  left: 15px; */
  fill: white;
  opacity: 0.8;
`;

const SettingBox = styled(motion.div)`
  width: 700px;
  height: 620px;
  position: absolute;
  bottom: 40px;
  left: -10px;
  overflow: hidden;
`;

const SettingList = styled.div`
  width: 100%;
  height: 600px;
  position: relative;
  background-color: white;
  border-radius: 10px;
  color: black;
  display: flex;
  align-items: center;
  /* overflow: hidden; */
`;

const GenerList = styled.div`
  width: 200px;
  height: 100%;
  border-right: solid 1px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 30px 10px;
`;

const Gener = styled.div`
  font-size: 24px;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 30px;
`;

const Arrow = styled.div`
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-bottom: 10px solid transparent;
  border-top: 10px solid white;
  border-right: 8px solid transparent;
  position: absolute;
  bottom: -20px;
  left: 20px;
`;

interface IGener {
  id: number;
  title: string;
  body: JSX.Element;
}

const Setting = () => {
  const generObj = [
    { id: 0, title: "General", body: <General /> },
    { id: 1, title: "Photos", body: <Photos /> },
  ];
  const [click, setClick] = useState(false);
  const [gener, setGener] = useState<IGener>(generObj[0]);
  return (
    <Wrapper>
      <motion.div
        initial={{ scale: 1, rotate: 0 }}
        animate={click ? { scale: 1.2, rotate: 90 } : { scale: 1, rotate: 0 }}
      >
        <Settingicon
          onClick={() => setClick((prev) => !prev)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336c44.2 0 80-35.8 80-80s-35.8-80-80-80s-80 35.8-80 80s35.8 80 80 80z" />
        </Settingicon>
      </motion.div>
      <AnimatePresence>
        <SettingBox
          style={
            window.innerWidth <= 720
              ? { width: window.innerWidth - 100 }
              : { width: 700 }
          }
          initial={{ bottom: 30, opacity: 0 }}
          animate={
            click ? { bottom: 40, opacity: 1 } : { bottom: 30, opacity: 0 }
          }
        >
          {click && (
            <SettingList>
              <GenerList>
                {generObj.map((item) => (
                  <Gener
                    onClick={() => setGener(() => item)}
                    style={
                      gener?.id === item.id
                        ? { fontWeight: 700 }
                        : { fontWeight: 400 }
                    }
                    key={item.id}
                  >
                    {item.title}
                  </Gener>
                ))}
              </GenerList>
              <Content> {gener?.body}</Content>
              <Arrow />
            </SettingList>
          )}
        </SettingBox>
      </AnimatePresence>
    </Wrapper>
  );
};

export default Setting;
