import { Instance, onSnapshot, types } from "mobx-state-tree";
import {
  TaskInstance,
  TodolistAPIInstance,
  TodolistAPIModel,
} from "./todolist";
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
    addTask(todolistId: number, task: TaskInstance) {
      const todolist = self.todos.get(todolistId);
      if (todolist) {
        todolist.task_list.push(task);
        todolist.task_length = todolist.task_list.length;
      }
    },
    removeTask(todolist_id: number, id: number) {
      const taskList = self.todos.get(todolist_id)?.task_list;

      if (taskList) {
        const indexToRemove = taskList.findIndex((item) => item.id == id);
        console.log(taskList[indexToRemove]);
      }
    },
    updateTaskList(todolistId: number, newTaskList: TaskInstance[]) {
      self.todos.get(todolistId)?.task_list.replace(newTaskList);
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
  if (RootStoreModel.is(json)) initialState = RootStoreModel.create(json);
}

export const rootStore = initialState;

onSnapshot(rootStore, (snapshot) => {
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
