import { categoryState, toDoState } from "atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ToDo from "./ToDo";

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
        <input type="text" name="toDo" />
      </form>
    </div>
  );
};

export default CreateToDo;
