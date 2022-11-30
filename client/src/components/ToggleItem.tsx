import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Toggle = styled.li`
  padding: 10px 5px;
  border-bottom: solid 1px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:first-child {
    border-top: solid 1px rgba(0, 0, 0, 0.3);
  }
`;

const BtnBg = styled.div`
  width: 40px;
  height: 22px;
  border-radius: 20px;
  position: relative;
  transition: ease 0.5s;
`;

const Btn = styled(motion.div)`
  width: 14px;
  height: 14px;
  border-radius: 15px;
  position: absolute;
  top: 50%;
  margin-top: -7px;
  background-color: white;
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
    console.log(toggle);
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
          <AnimatePresence>
            <Btn
              style={
                toggle
                  ? { backgroundColor: "e2e2e2" }
                  : { backgroundColor: "white" }
              }
              initial={{
                right: 6,
                scale: 1,
              }}
              animate={
                toggle
                  ? {
                      right: 6,
                      scale: 1.2,
                    }
                  : { left: 5 }
              }
            ></Btn>
          </AnimatePresence>
        </BtnBg>
      </Toggle>
    </>
  );
};

export default ToggleItem;
