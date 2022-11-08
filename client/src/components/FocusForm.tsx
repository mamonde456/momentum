import { useState } from "react";
import styled from "styled-components";

const TodayFocus = styled.div`
  font-size: 32px;
`;
const Input = styled.input`
  width: 500px;
  height: 50px;
  border: none;
  border-bottom: solid 2px rgba(255, 255, 255, 0.3);
  font-size: 18px;
  text-align: center;
  color: white;
  background: none;
  :focus {
    outline: none;
    border-bottom: solid 2px rgba(255, 255, 255, 0.7);
  }
`;
const FocusTextBox = styled.div`
  display: flex;
  align-items: center;
`;

const FocusText = styled.p`
  padding: 10px;
  font-size: 42px;
`;
const Icon = styled.svg`
  width: 30px;
  height: 30px;
  fill: white;
`;

const FocusForm = () => {
  const [focusCheck, setFocusCheck] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement | any>) => {
    //??
    e.preventDefault();
    const {
      currentTarget: {
        focus: { value },
      },
    } = e;

    window.localStorage.setItem("focus", value);
    return e.currentTarget.reset();
  };
  return (
    <>
      {window.localStorage.getItem("focus") && (
        <FocusTextBox>
          {focusCheck ? (
            <Icon
              onClick={() => setFocusCheck((prev) => !prev)}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M211.8 339.8C200.9 350.7 183.1 350.7 172.2 339.8L108.2 275.8C97.27 264.9 97.27 247.1 108.2 236.2C119.1 225.3 136.9 225.3 147.8 236.2L192 280.4L300.2 172.2C311.1 161.3 328.9 161.3 339.8 172.2C350.7 183.1 350.7 200.9 339.8 211.8L211.8 339.8zM0 96C0 60.65 28.65 32 64 32H384C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96zM48 96V416C48 424.8 55.16 432 64 432H384C392.8 432 400 424.8 400 416V96C400 87.16 392.8 80 384 80H64C55.16 80 48 87.16 48 96z" />
            </Icon>
          ) : (
            <Icon
              onClick={() => setFocusCheck((prev) => !prev)}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M384 32C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H384zM384 80H64C55.16 80 48 87.16 48 96V416C48 424.8 55.16 432 64 432H384C392.8 432 400 424.8 400 416V96C400 87.16 392.8 80 384 80z" />
            </Icon>
          )}
          <FocusText
            style={
              focusCheck
                ? { textDecoration: "line-through" }
                : { textDecoration: "none" }
            }
          >
            {window.localStorage.getItem("focus")}
          </FocusText>
        </FocusTextBox>
      )}
      {!window.localStorage.getItem("focus") && (
        <>
          <TodayFocus>What is your main focus for today?</TodayFocus>
          <form onSubmit={(e) => onSubmit(e)}>
            <Input type="text" name="focus" />
          </form>
        </>
      )}
    </>
  );
};

export default FocusForm;
