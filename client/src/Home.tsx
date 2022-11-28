import Weather from "components/Weather";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import ToDoList from "components/ToDoList";
import { backgroundImgFn, quotesFn } from "api";
import Setting from "components/Setthing";
import Spotify from "components/Spotify";
import Login from "components/Login";
import { AnimatePresence, motion } from "framer-motion";
import MainText from "components/MainText";
import { useSetRecoilState } from "recoil";
import { settingState } from "atom";

const code = new URLSearchParams(window.location.search).get("code") as string;

const Wrapper = styled.div<{ bgPhoto: string }>`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: black;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.5),
      10%,
      rgba(0, 0, 0, 0)
    ),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center;
`;

const Quote = styled.div`
  padding: 10px;
  font-size: 16px;
  color: white;
`;
const SpotifyBtn = styled(motion.div)`
  position: absolute;
  top: 10px;
  left: 20px;
  font-size: 14px;
`;

interface IData {
  alt_description: string;
  urls: {
    full: string;
    raw: string;
    regular: string;
    small: string;
    small_s3: string;
    thumb: string;
  };
  user: {
    name: string;
    link: {
      html: string;
    };
  };
}

interface IwindowSize {
  width: number;
  height: number;
}

interface IQuotes {
  slip: {
    advice: string;
    id: number;
  };
}

const Home = () => {
  const [bg, setBg] = useState<IData>();
  const [resize, setResize] = useState<IwindowSize>();
  const [time, setTime] = useState<Date | undefined>();
  const [hello, setHello] = useState<string>("");
  const bgValue = window.localStorage.getItem("bgPhoto");
  const setSetting = useSetRecoilState(settingState);

  const { isLoading, data } = useQuery(
    ["background_image", bgValue],
    () => backgroundImgFn(bgValue || "nature"),
    {
      refetchOnWindowFocus: false,
      retry: 0,
    }
  );
  const { isLoading: isQuote, data: quotes } = useQuery<IQuotes>(
    ["quote"],
    () => quotesFn(),
    {
      refetchOnWindowFocus: false,
      retry: 0,
    }
  );

  const resizeFn = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    setResize({ width, height });
  };

  useEffect(() => {
    window.addEventListener("resize", resizeFn);

    return () => window.removeEventListener("resize", resizeFn);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    const hour = String(time).slice(16, 18);
    if (Number(hour) >= 17) {
      return setHello("Good evening");
    }
    if (Number(hour) >= 12 && Number(hour) < 17) {
      return setHello("Good afternoon");
    }
    if (Number(hour) < 12) {
      return setHello("Good morning");
    }

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (isLoading) return;
    setBg(data[Math.floor(Math.random() * 10)]);
  }, [data]);

  return (
    <Wrapper bgPhoto={bg?.urls.regular || ""}>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
        }}
        onClick={() => setSetting(false)}
      ></div>
      {JSON.parse(window.localStorage.getItem("Spotify") || "true") && (
        <SpotifyBtn
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {code ? <Spotify code={code} /> : <Login />}
        </SpotifyBtn>
      )}
      <MainText time={time} hello={hello} />
      <ToDoList />
      <Setting />
      <AnimatePresence>
        {JSON.parse(window.localStorage.getItem("Weather") || "true") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Weather />
          </motion.div>
        )}
        {JSON.parse(window.localStorage.getItem("Quotes") || "true") && (
          <motion.div
            key="quotesBox"
            style={
              window.innerWidth < 1200
                ? { position: "absolute", bottom: 70, transition: "ease .5s" }
                : { position: "absolute", bottom: 30 }
            }
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {isQuote ? (
              <Quote>is loading...</Quote>
            ) : (
              <Quote>{quotes?.slip?.advice}</Quote>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};

export default Home;
