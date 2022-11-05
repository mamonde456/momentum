import { Categories, categoryState, IToDo, toDoState } from "atom";
import { useRecoilValue, useSetRecoilState } from "recoil";

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
    <>
      <div>
        {category === Categories.TO_DO ? (
          <>
            <p>{text}</p>
            <>
              {category === Categories.TO_DO && (
                <>
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
                </>
              )}
            </>
          </>
        ) : (
          <>
            <p style={{ textDecoration: "line-through" }}>{text}</p>
            <>
              {selectorCategory === Categories.DONE && (
                <>
                  <button
                    name={Categories.TO_DO + ""}
                    onClick={() => onClick(Categories.TO_DO)}
                  >
                    To Do
                  </button>
                </>
              )}
              <button
                name={Categories.DELETE + ""}
                onClick={() => onClick(Categories.DELETE)}
              >
                Delete
              </button>
            </>
          </>
        )}
      </div>
    </>
  );
};

export default ToDo;
