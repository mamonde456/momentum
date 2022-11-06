// import { backgroundImgFn } from "api";
import Weather from "components/Weather";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import ToDoList from "ToDoList";
import { backgroundImgFn } from "api";
import { useRecoilState } from "recoil";
import { toDoShowState } from "atom";

const Background = styled.div<{ bg: string }>`
  width: 100vw;
  height: 100vh;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center;
`;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  -webkit-text-stroke: 1px rgba(0, 0, 0, 0.5);
  position: absolute;
`;

const MainBox = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  /* color: white; */
`;

const Title = styled.div`
  padding: 10px;
  font-size: 72px;
  font-weight: 700;
`;

const NameInput = styled.input`
  width: 500px;
  height: 50px;
  border: none;
  border-bottom: solid 2px rgba(0, 0, 0, 0.3);
  font-size: 18px;
  text-align: center;
  :focus {
    outline: none;
    border-bottom: solid 2px rgba(0, 0, 0, 0.7);
  }
`;

const FocusText = styled.div`
  font-size: 32px;
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

const Home = () => {
  const [bg, setBg] = useState<IData>();
  const [toDo, setToDo] = useRecoilState(toDoShowState);
  const [resize, setResize] = useState<IwindowSize>();
  const [time, setTime] = useState<Date | undefined>();
  const [focusShow, setFocusShow] = useState(false);
  const TitleRef = useRef<HTMLDivElement>(null);

  const { isLoading, data } = useQuery(
    ["background_image"],
    () => backgroundImgFn("nature"),
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
    // if(new Date().getHours() <= 0){

    // }
    setBg(data[Math.floor(Math.random() * 10)]);
  }, []);

  const onSubmit = (
    e: React.FormEvent<HTMLFormElement | any>,
    type: string
  ) => {
    //??
    e.preventDefault();
    const {
      currentTarget: { name, focus },
    } = e;
    if (type === "name") {
      setFocusShow((prev) => !prev);
      window.localStorage.setItem("name", name.value);
      return e.currentTarget.reset();
    }
    if (type === "focus") {
      setFocusShow((prev) => !prev);
      window.localStorage.setItem("focus", focus.value);
      return e.currentTarget.reset();
    }
  };
  return (
    <>
      <Wrapper>
        <Weather />
        <MainBox>
          {time && (
            <p
              style={
                window.localStorage.getItem("name")
                  ? { fontSize: 120, fontWeight: 700 }
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
                : { fontSize: 82 }
            }
            ref={TitleRef}
          >
            {window.localStorage.getItem("name")
              ? `Hello, ${window.localStorage.getItem("name")}`
              : "Hello, what's your name?"}
          </Title>
          {window.localStorage.getItem("focus") ? (
            <div>
              <p style={{ fontSize: 24 }}>
                {window.localStorage.getItem("focus")}
                <span
                  onClick={() => {
                    window.localStorage.removeItem("focus");
                    setFocusShow((prev) => !prev);
                  }}
                >
                  X
                </span>
              </p>
            </div>
          ) : null}
          <form
            onSubmit={(e) => onSubmit(e, "name")}
            style={
              window.localStorage.getItem("name")
                ? { display: "none" }
                : { display: "block" }
            }
          >
            <NameInput
              style={
                window.localStorage.getItem("name")
                  ? { width: TitleRef?.current?.offsetWidth }
                  : { width: 800 }
              }
              type="text"
              name="name"
            />
          </form>
          <form
            onSubmit={(e) => onSubmit(e, "focus")}
            style={focusShow ? { display: "block" } : { display: "none" }}
          >
            <FocusText>What is your main focus for today?</FocusText>
            <NameInput type="text" name="focus" />
          </form>
        </MainBox>
        <div style={{ position: "absolute", bottom: 10, right: 10 }}>
          <p
            onClick={() => setToDo((prev) => !prev)}
            style={
              toDo
                ? { display: "none" }
                : { fontSize: 24, fontWeight: 700, display: "block" }
            }
          >
            To Do
          </p>
          <div style={toDo ? { display: "block" } : { display: "none" }}>
            <ToDoList />
          </div>
        </div>
      </Wrapper>

      <Background
        style={{ width: resize?.width, height: resize?.height }}
        bg={bg?.urls.regular || ""}
      ></Background>
    </>
    // <Wrapper bg={bg[0].urls?.regular || ""}>
    //   <div>{bg.map((item) => item)}</div>
    //   <div>dd</div>
    // </Wrapper>
  );
};

export default Home;
