import { useEffect } from "react";
import styled from "styled-components";
import ToggleItem from "./ToggleItem";

const TitleBox = styled.div`
  margin-bottom: 30px;
`;

const Title = styled.p`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const Toggles = styled.ul``;

const General = () => {
  const toggleMap = [
    { id: 0, title: "Spotify" },
    { id: 1, title: "Todo" },
    { id: 2, title: "Weather" },
    { id: 3, title: "Focus" },
    { id: 4, title: "Clock" },
    { id: 5, title: "Quotes" },
  ];

  useEffect(() => {
    for (let i = 0; i < toggleMap.length; i++) {
      window.localStorage.setItem(toggleMap[i].title, "true");
    }
  }, []);
  return (
    <>
      <TitleBox>
        <Title>General</Title>
        <p style={{ opacity: 0.8, fontSize: 12 }}>Customize your dashboard</p>
      </TitleBox>
      <Toggles>
        {toggleMap?.map((item) => (
          <ToggleItem key={item.id} title={item.title} id={item.id} />
        ))}
      </Toggles>
    </>
  );
};

export default General;
