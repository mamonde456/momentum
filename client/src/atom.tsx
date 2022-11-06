import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: localStorage,
});

export enum Categories {
  "TO_DO",
  "DONE",
  "DELETE",
}
export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
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

export const toDoShowState = atom({
  key: "istoDoShow",
  default: false,
});
