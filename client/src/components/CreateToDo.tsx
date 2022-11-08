import { categoryState, toDoState } from "atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import ToDo from "./ToDo";

const Input = styled.input`
  width: 100%;
  height: 50px;
  border: none;
  font-size: 18px;
  text-indent: 10px;
  &::placeholder {
    opacity: 0.5;
  }
  &:focus {
    outline: none;
    border-bottom: solid 1px rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
  }
`;

const CreateToDo = () => {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = e.currentTarget.toDo.value;
    if (value === "") return;
    setToDos((oldToDo) => [
      ...oldToDo,
      { text: value, id: Date.now(), category },
    ]);
    e.currentTarget.reset();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Input type="text" name="toDo" placeholder="New To Do" />
      </form>
    </div>
  );
};

export default CreateToDo;
