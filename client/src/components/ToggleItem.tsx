import { useEffect, useState } from "react";
import styled from "styled-components";

const Toggle = styled.li`
  padding: 10px;
  border-bottom: solid 1px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const BtnBg = styled.div`
  width: 60px;
  height: 35px;
  border-radius: 20px;
  position: relative;
`;

const Btn = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 15px;
  position: absolute;
  top: 50%;
  margin-top: -10px;
`;

interface IProps {
  id: number;
  title: string;
}

const ToggleItem = ({ id, title }: IProps) => {
  const [toggle, setToggle] = useState(true);

  const onToggle = () => {
    setToggle((prev) => !prev);
  };

  useEffect(() => {
    window.localStorage.setItem(title, `${toggle}`);
  }, [toggle]);
  return (
    <>
      <Toggle key={id} onClick={onToggle}>
        {title}
        <BtnBg
          style={
            toggle
              ? { backgroundColor: "#82cd47" }
              : { backgroundColor: "#bcbcbc" }
          }
        >
          <Btn
            style={
              toggle
                ? {
                    right: 6,
                    backgroundColor: "white",
                    transform: "scale(1.2)",
                  }
                : { left: 5, backgroundColor: "#e2e2e2" }
            }
          ></Btn>
        </BtnBg>
      </Toggle>
    </>
  );
};

export default ToggleItem;
