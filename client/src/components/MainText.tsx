import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import FocusForm from "./FocusForm";
import NameForm from "./NameForm";

const Wrapper = styled(motion.div)`
  position: absolute;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;

const Title = styled(motion.div)`
  padding: 10px;
  font-size: 60px;
`;
interface IProps {
  time: Date | undefined;
  hello: string;
}

const MainText = (props: IProps) => {
  const titleRef = useRef<HTMLDivElement>(null);

  return (
    <Wrapper>
      <AnimatePresence>
        {JSON.parse(window.localStorage.getItem("Clock") || "true") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {props.time && window.localStorage.getItem("name") && (
              <p style={{ fontSize: 170 }}>
                {String(props.time).slice(16, 21)}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <Title
        transition={{ duration: 0.5 }}
        style={
          window.localStorage.getItem("name")
            ? { fontSize: 52 }
            : { fontSize: 70 }
        }
        ref={titleRef}
      >
        {window.localStorage.getItem("name")
          ? `${props.hello}, ${window.localStorage.getItem("name")}`
          : "Hello, what's your name?"}
      </Title>

      {!window.localStorage.getItem("name") && (
        <NameForm width={titleRef?.current?.offsetWidth} />
      )}
      <FocusForm />
    </Wrapper>
  );
};

export default MainText;
