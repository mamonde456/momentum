import { Categories, categoryState, setToDos, toDoState } from "atom";
import CreateToDo from "components/CreateToDo";
import ToDo from "components/ToDo";
import { useRecoilState, useRecoilValue } from "recoil";

const ToDoList = () => {
  const toDos = useRecoilValue(setToDos);
  // console.log(toDos);
  const [category, setCategory] = useRecoilState(categoryState);

  const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
    setCategory(+e.currentTarget.value as number);
  };
  return (
    <div>
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>Today</option>
        <option value={Categories.DONE}>done</option>
      </select>
      <p>todo</p>
      {toDos?.map((item) => (
        <ToDo key={item.id} {...item} />
      ))}
      <CreateToDo />
    </div>
  );
};

export default ToDoList;
