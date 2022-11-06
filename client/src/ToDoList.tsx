import {
  Categories,
  categoryState,
  setToDos,
  toDoShowState,
  toDoState,
} from "atom";
import CreateToDo from "components/CreateToDo";
import ToDo from "components/ToDo";
import { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

const ToDoBox = styled.div`
  width: 400px;
  padding: 10px;
  background-color: white;
  border-radius: 10px;
  color: black;
  -webkit-text-stroke: none;
`;

const SelectBox = styled.div`
  position: relative;
  height: 30px;
  margin-bottom: 30px;
`;
const Select = styled.ul`
  width: 150px;
  padding: 10px;
  position: absolute;
  top: 40px;
  background-color: white;
  overflow: hidden;
`;

const Option = styled.li`
  /* position: absolute; */
  top: 50px;
  padding: 10px;
`;

const CloseBtn = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
`;

const ToDoList = () => {
  const toDos = useRecoilValue(setToDos);
  const [click, setClick] = useState(false);
  const setIsShow = useSetRecoilState(toDoShowState);
  // console.log(toDos);
  const [category, setCategory] = useRecoilState(categoryState);

  const onClick = (value: number, text?: string) => {
    if (value || text) {
      console.log("Test");
      setClick((prev) => !prev);
    }
    setCategory(value);
  };
  return (
    <ToDoBox>
      <SelectBox style={toDos?.length === 0 ? { height: 100 } : { height: 30 }}>
        <p onClick={() => setClick((prev) => !prev)} style={{ fontSize: 24 }}>
          {category === 1 ? "Done" : "Today"}
        </p>
        <Select style={click ? { height: 80 } : { height: 0 }}>
          <Option onClick={() => onClick(Categories.TO_DO, "test")}>
            Today
          </Option>
          <Option onClick={() => onClick(Categories.DONE)}>done</Option>
        </Select>
        <CloseBtn onClick={() => setIsShow((prev) => !prev)}>X</CloseBtn>
      </SelectBox>
      {toDos?.map((item) => (
        <ToDo key={item.id} {...item} />
      ))}
      <CreateToDo />
    </ToDoBox>
  );
};

export default ToDoList;
