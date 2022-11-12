import { Categories, categoryState, IToDo, toDoState } from "atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

const ToDoBox = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;

const Text = styled.div`
  max-width: 220px;
  font-size: 14px;
  word-break: break-all;
`;
const Btn = styled.button`
  font-size: 12px;
`;

const ToDo = ({ text, id, category }: IToDo) => {
  const setToDo = useSetRecoilState(toDoState);
  const selectorCategory = useRecoilValue(categoryState);
  const onClick = (name: IToDo["category"]) => {
    setToDo((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name };
      if (name === Categories.DELETE)
        return [
          ...oldToDos.slice(0, targetIndex),
          ...oldToDos.slice(targetIndex + 1),
        ];
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <ToDoBox>
      {category === Categories.TO_DO ? (
        <>
          <Text>{text}</Text>

          {category === Categories.TO_DO && (
            <div>
              <Btn
                name={Categories.DONE + ""}
                onClick={() => onClick(Categories.DONE)}
              >
                Done
              </Btn>
              <Btn
                name={Categories.DELETE + ""}
                onClick={() => onClick(Categories.DELETE)}
              >
                Delete
              </Btn>
            </div>
          )}
        </>
      ) : (
        <>
          <Text style={{ textDecoration: "line-through" }}>{text}</Text>
          <div>
            {selectorCategory === Categories.DONE && (
              <Btn
                name={Categories.TO_DO + ""}
                onClick={() => onClick(Categories.TO_DO)}
              >
                To Do
              </Btn>
            )}
            <Btn
              name={Categories.DELETE + ""}
              onClick={() => onClick(Categories.DELETE)}
            >
              Delete
            </Btn>
          </div>
        </>
      )}
    </ToDoBox>
  );
};

export default ToDo;
