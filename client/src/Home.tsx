import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Background = styled.div<{ bg: string }>`
  width: 100vw;
  height: 100vh;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center;
`;

const Content = styled.div`
  /* position: absolute; */
`;

const MainTitle = styled.h1`
  font-size: 48px;
  position: absolute;
  top: 50%;
  margin-top: -75px;
  left: 50%;
  margin-left: -75px;
  text-transform: uppercase;
  background: red;
  /* color: white; */
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
  const [bg, setBg] = useState<IData[]>();
  const [resize, setResize] = useState<IwindowSize>();

  const resizeFn = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    setResize({ width, height });
  };

  useEffect(() => {
    window.addEventListener("resize", resizeFn);

    return () => window.removeEventListener("resize", resizeFn);
  }, [window.location]);

  useEffect(() => {
    const config = {
      client_id: "YDIkdn5nE19BVaUr1L9Cnh12iVuX0BBdA3TwzBCZT8w",
      query: "nature",
      count: "10",
    };
    const param = new URLSearchParams(config).toString();
    const Fn = async () => {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?${param}`
      );

      const data = await response.json();
      // const result = data.map((item: IData) => {
      //   return {
      //     description: item.alt_description,
      //     imgUrls: item.urls,
      //     user: item.user.name,
      //     userProfile: item.user.link.html,
      //   };

      // });
      setBg(() => data);
    };
    Fn();
  }, []);
  return (
    <>
      <Content>
        <MainTitle>komentum</MainTitle>
        <input type="text" name="name" />
      </Content>
      {/* {bg?.slice(0, 1).map((item) => (
        <Background
          style={{ width: resize?.width, height: resize?.height }}
          bg={item.urls.full}
        ></Background>
      ))} */}
    </>
    // <Wrapper bg={bg[0].urls?.regular || ""}>
    //   <div>{bg.map((item) => item)}</div>
    //   <div>dd</div>
    // </Wrapper>
  );
};

export default Home;
