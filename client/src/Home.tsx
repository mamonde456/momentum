// import { backgroundImgFn } from "api";
import Weather from "components/Weather";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import ToDoList from "components/ToDoList";
import { backgroundImgFn, quotesFn } from "api";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import NameForm from "components/NameForm";
import FocusForm from "components/FocusForm";
import Setting from "components/Setthing";

const Wrapper = styled.div<{ bgPhoto: string }>`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center;
`;

const MainBox = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: 50px;
  /* gap: 30px; */
  /* color: white; */
`;

const Title = styled.div`
  padding: 10px;
  font-size: 100px;
  /* font-weight: 700; */
`;
const Quote = styled.div`
  position: absolute;
  bottom: 30px;
  font-size: 22px;
  opacity: 0.5;
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
  const titleRef = useRef<HTMLDivElement>(null);
  const bgValue = window.localStorage.getItem("bgPhoto");

  const { isLoading, data } = useQuery(
    ["background_image", bgValue],
    () => backgroundImgFn(bgValue || "null"),
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
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("resize", resizeFn);

    return () => window.removeEventListener("resize", resizeFn);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    setBg(data[Math.floor(Math.random() * 10)]);
  }, [data]);

  return (
    <Wrapper bgPhoto={bg?.urls.regular || ""}>
      <Weather />
      <MainBox>
        {time && (
          <p
            style={
              window.localStorage.getItem("name")
                ? { fontSize: 180 }
                : { display: "none" }
            }
          >
            {String(time).slice(16, 24)}
          </p>
        )}
        <Title
          style={
            window.localStorage.getItem("name")
              ? { fontSize: 62 }
              : { fontSize: 100 }
          }
          ref={titleRef}
        >
          {window.localStorage.getItem("name")
            ? `Hello, ${window.localStorage.getItem("name")}`
            : "Hello, what's your name?"}
        </Title>

        {!window.localStorage.getItem("name") && (
          <NameForm width={titleRef?.current?.offsetWidth} />
        )}
        {window.localStorage.getItem("name") && <FocusForm />}
      </MainBox>

      <ToDoList />
      <Setting></Setting>
      <Quote>{quotes?.slip?.advice}</Quote>
    </Wrapper>
  );
};

export default Home;
