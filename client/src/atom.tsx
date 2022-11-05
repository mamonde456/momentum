import { atom, selector } from "recoil";

export enum Categories {
  "TO_DO",
  "DONE",
}
export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const setToDos = selector({
  key: "setToDos",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    if (category === Categories.TO_DO) return toDos.filter((toDo) => toDo);
    if (category === Categories.DONE)
      return toDos.filter((toDo) => toDo.category === Categories.DONE);
  },
});
