import { Instance, onSnapshot, types } from "mobx-state-tree";
import { TodolistAPIInstance, TodolistAPIModel } from "./todolist";
import { createContext, useContext } from "react";

export const RootStoreModel = types
  .model({
    todos: types.map(TodolistAPIModel),
  })
  .actions((self) => ({
    addTodo(todolist: TodolistAPIInstance) {
      self.todos.put(todolist);
    },
    removeTodo(id: number) {
      if (self.todos.has(id)) return self.todos.delete(id.toString());

      return false;
    },
    updateTodolist(newTodolist: TodolistAPIInstance[]) {
      newTodolist.map((item) => self.todos.put(item));
    },
  }))
  .views((self) => ({
    get todolist() {
      const dataList = Array.from(self.todos.values());

      return dataList;
    },
  }));

export type RootStoreInstance = Instance<typeof RootStoreModel>;

let initialState = RootStoreModel.create();

const data = localStorage.getItem("rootState");

if (data) {
  const json = JSON.parse(data);
  console.log(json);
  if (RootStoreModel.is(json)) {
    initialState = RootStoreModel.create(json);
    console.groupCollapsed("StoreData");
    console.log(initialState);
    console.groupEnd();
  }
}

export const rootStore = initialState;

onSnapshot(rootStore, (snapshot) => {
  console.log(`Snapshot: ${snapshot}`);
  localStorage.setItem("rootState", JSON.stringify(snapshot));
});

const RootStoreContext = createContext<null | RootStoreInstance>(null);

export const Provider = RootStoreContext.Provider;

export const useMst = () => {
  const store = useContext(RootStoreContext);

  if (store === null) {
    throw new Error("Store não pode ser null, adicione o context provider");
  }

  return store;
};
