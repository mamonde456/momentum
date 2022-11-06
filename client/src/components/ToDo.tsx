import { Categories, categoryState, IToDo, toDoState } from "atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

const ToDoBox = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;

const BtnBox = styled.div``;
const Text = styled.div`
  width: 230px;
  word-break: break-all;
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
            <BtnBox>
              <button
                name={Categories.DONE + ""}
                onClick={() => onClick(Categories.DONE)}
              >
                Done
              </button>
              <button
                name={Categories.DELETE + ""}
                onClick={() => onClick(Categories.DELETE)}
              >
                Delete
              </button>
            </BtnBox>
          )}
        </>
      ) : (
        <>
          <Text style={{ textDecoration: "line-through" }}>{text}</Text>
          <BtnBox>
            {selectorCategory === Categories.DONE && (
              <button
                name={Categories.TO_DO + ""}
                onClick={() => onClick(Categories.TO_DO)}
              >
                To Do
              </button>
            )}
            <button
              name={Categories.DELETE + ""}
              onClick={() => onClick(Categories.DELETE)}
            >
              Delete
            </button>
          </BtnBox>
        </>
      )}
    </ToDoBox>
  );
};

export default ToDo;
