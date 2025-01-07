import { Instance, types } from "mobx-state-tree";

export const ToDoListModel = types.model({
  id: types.identifierNumber,
  title: types.string,
  description: types.string,
});

export const TodolistAPIModel = types.model({
  id: types.identifierNumber,
  title: types.string,
  description: types.string,
  taskLength: types.number,
});

export const Task = types.model({
  description: "",
  todolist_id: 0,
  done: false,
});

export type TodoListInstance = Instance<typeof ToDoListModel>;
export type TodolistAPIInstance = Instance<typeof TodolistAPIModel>;
