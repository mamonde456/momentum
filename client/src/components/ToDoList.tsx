import { Categories, categoryState, setToDos, toDoState } from "atom";
import CreateToDo from "components/CreateToDo";
import ToDo from "components/ToDo";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";

const ToDoBox = styled(motion.div)`
  color: black;
  -webkit-text-stroke: none;
  position: absolute;
  bottom: 10px;
  right: 20px;
  .container {
    padding: 5px 2px;
    background-color: white;
    border-radius: 10px;
    position: absolute;
    bottom: 60px;
    right: 0;
    z-index: 2;
  }
`;

const ClickToDo = styled.p`
  padding: 10px;
  font-size: 18px;
  position: absolute;
  bottom: 0;
  right: 0;
  color: white;
  font-weight: 700;
  cursor: pointer;
`;

const ToDoListBox = styled(motion.div)`
  width: 350px;
  max-height: 500px;
  padding: 10px;

  .list {
    background-color: #f9f9f9;
    border-radius: 5px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    position: absolute;
    z-index: 1;
  }
`;
const Nothing = styled.p`
  color: #44404f;
  font-size: 16px;
  opacity: 0.8;
  padding: 50px 30px;
  text-align: center;
  /* margin-bottom: 50px; */
`;

const ToDoTextBox = styled.div`
  padding: 10px 0px;
  max-height: 400px;
  position: relative;
  bottom: 30px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 5px;
    height: 100%;
    background: none;
  }
  ::-webkit-scrollbar-thumb {
    background-color: black;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    background: none;
    border-radius: 10px;
  }
`;

const TitleBox = styled.div`
  position: relative;
  height: 20px;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Icon = styled.svg`
  width: 15px;
  height: 15px;
  cursor: pointer;
`;

const Select = styled.ul`
  padding: 10px 0px;
  width: 100px;
  top: 50px;
  left: 10px;
`;

const MenuList = styled.ul`
  padding: 10px 0px;
  width: 200px;
  right: 20px;
  top: 50px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
`;
const Menu = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #eeee;
  }
`;

const Arrow = styled.div`
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-bottom: 10px solid transparent;
  border-top: 10px solid white;
  border-right: 8px solid transparent;
  position: absolute;
  bottom: -20px;
  right: 20px;
`;

const ToDoList = () => {
  const toDos = useRecoilValue(setToDos);
  const [isShow, setIsShow] = useState(false);
  const [click, setClick] = useState(false);
  const [menu, setMenu] = useState(false);
  const [toDoList, setToDoList] = useRecoilState(toDoState);
  const [category, setCategory] = useRecoilState(categoryState);

  const onClick = (value: number) => {
    if (String(value)) {
      setClick((prev) => !prev);
    }
    setCategory(value);
  };

  const menuClick = (text: string) => {
    if (text === "all") {
      setToDoList([]);
      return setMenu(false);
    } else if (text === "todo") {
      setToDoList(toDoList.filter((toDo) => toDo.category === Categories.DONE));
      return setMenu(false);
    } else {
      setToDoList(
        toDoList.filter((toDo) => toDo.category === Categories.TO_DO)
      );
      return setMenu(false);
    }
  };
  return (
    <AnimatePresence>
      {JSON.parse(window.localStorage.getItem("Todo") || "true") && (
        <ToDoBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ClickToDo
            onClick={() => {
              setIsShow((prev) => !prev);
              setClick(false);
              setMenu(false);
            }}
          >
            Todo
          </ClickToDo>
          {isShow && (
            <div className="container">
              <ToDoListBox
                initial={{ bottom: 50, opacity: 0 }}
                animate={
                  isShow
                    ? { bottom: 80, opacity: 1 }
                    : { bottom: 50, opacity: 0 }
                }
                transition={{ duration: 0.5 }}
              >
                <div>
                  <TitleBox>
                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => setClick((prev) => !prev)}
                    >
                      <p style={{ fontSize: 18, fontWeight: 500 }}>
                        {category === 1 ? "Done" : "Today"}
                      </p>
                      <Icon
                        style={
                          click
                            ? {
                                transform: "rotate(180deg)",
                                transition: "ease 0.5s",
                              }
                            : {
                                transform: "rotate(0deg)",
                                transition: "ease 0.5s",
                              }
                        }
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                      >
                        <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                      </Icon>
                    </div>
                    <Icon
                      onClick={() => setMenu((prev) => !prev)}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 128 512"
                    >
                      <path d="M64 360c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zm0-160c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zM120 96c0 30.9-25.1 56-56 56S8 126.9 8 96S33.1 40 64 40s56 25.1 56 56z" />
                    </Icon>
                  </TitleBox>
                  <Select
                    className="list"
                    style={click ? { display: "block" } : { display: "none" }}
                  >
                    <Menu onClick={() => onClick(Categories.TO_DO)}>Today</Menu>
                    <Menu onClick={() => onClick(Categories.DONE)}>done</Menu>
                  </Select>
                  <MenuList
                    className="list"
                    style={menu ? { display: "block" } : { display: "none" }}
                  >
                    <Menu onClick={() => menuClick("all")}>All delete</Menu>
                    <Menu onClick={() => menuClick("todo")}>Todo delete</Menu>
                    <Menu onClick={() => menuClick("done")}>Done delete</Menu>
                  </MenuList>
                </div>
                <ToDoTextBox>
                  {toDos?.length === 0 && (
                    <Nothing>Add a todo to get started</Nothing>
                  )}
                  {toDos?.map((item) => (
                    <ToDo key={item.id} {...item} />
                  ))}
                </ToDoTextBox>
                <Arrow />
                <CreateToDo />
              </ToDoListBox>
            </div>
          )}
        </ToDoBox>
      )}
    </AnimatePresence>
  );
};

export default ToDoList;
