import { Categories, categoryState, setToDos, toDoState } from "atom";
import CreateToDo from "components/CreateToDo";
import ToDo from "components/ToDo";
import { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

const ToDoBox = styled.div`
  color: black;
  -webkit-text-stroke: none;
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

const ClickToDo = styled.p`
  width: 90px;
  padding: 10px;
  font-size: 24px;
  position: absolute;
  bottom: 0;
  right: 0;
  color: white;
  font-weight: 700;
`;

const ToDoListBox = styled.div`
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 400px;
  padding: 10px;
  background-color: white;
  border-radius: 10px;
`;
const Nothing = styled.p`
  color: #44404f;
  font-size: 18px;
  opacity: 0.8;
  padding: 10px;
  text-align: center;
  margin-bottom: 50px;
`;

const SelectBox = styled.div`
  position: relative;
  height: 30px;
  margin-bottom: 50px;
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

const Arrow = styled.div`
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-bottom: 20px solid transparent;
  border-top: 20px solid white;
  border-right: 15px solid transparent;
  position: absolute;
  bottom: -40px;
  right: 30px;
`;

const ToDoList = () => {
  const toDos = useRecoilValue(setToDos);
  const [click, setClick] = useState(false);
  const [isShow, setIsShow] = useState(false);
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
      <ClickToDo onClick={() => setIsShow((prev) => !prev)}>To Do</ClickToDo>
      {isShow && (
        <ToDoListBox>
          <SelectBox>
            <p
              onClick={() => setClick((prev) => !prev)}
              style={{ fontSize: 24, fontWeight: 500 }}
            >
              {category === 1 ? "Done" : "Today"}
            </p>
            <Select style={click ? { height: 80 } : { height: 0 }}>
              <Option onClick={() => onClick(Categories.TO_DO, "test")}>
                Today
              </Option>
              <Option onClick={() => onClick(Categories.DONE)}>done</Option>
            </Select>
          </SelectBox>
          {toDos?.length === 0 && <Nothing>Add a todo to get started</Nothing>}
          {toDos?.map((item) => (
            <ToDo key={item.id} {...item} />
          ))}
          <CreateToDo />
          <Arrow />
        </ToDoListBox>
      )}
    </ToDoBox>
  );
};

export default ToDoList;
