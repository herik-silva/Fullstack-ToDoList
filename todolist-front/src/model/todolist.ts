import { Instance, types } from "mobx-state-tree";

export const ToDoListModel = types.model({
  id: types.identifierNumber,
  title: types.string,
  description: types.string,
});

export const TaskModel = types.model({
  id: types.identifierNumber,
  description: types.string,
  done: types.boolean,
});

export const TodolistAPIModel = types
  .model({
    id: types.identifierNumber,
    title: types.string,
    description: types.string,
    task_length: types.number,
    task_list: types.array(TaskModel),
  })
  .actions((self) => ({
    toggleTaskDone(task_id: number) {
      const target = self.task_list.find((value) => value.id == task_id);

      if (target) target.done = !target.done;
    },
  }));

export type TodoListInstance = Instance<typeof ToDoListModel>;
export type TodolistAPIInstance = Instance<typeof TodolistAPIModel>;
export type TaskInstance = Instance<typeof TaskModel>;
