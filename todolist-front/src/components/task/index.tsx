import { Checkbox, Flex, IconButton } from "@chakra-ui/react";
import { TaskInstance } from "../../model/todolist";
import { useMst } from "../../model/rootstore";
import Request from "../../core/utils/Request";
import { useState } from "react";
import RemoveTask from "../remove-task";

export type Task = {
  id: number;
  description: string;
  done: boolean;
  todolist_id: number;
};

type TaskComponentProps = {
  todolistId: number;
  task: TaskInstance;
};

const TaskComponent: React.FC<TaskComponentProps> = ({ todolistId, task }) => {
  const [isChecked, setIsChecked] = useState(task.done);
  const store = useMst();

  const handleOnToggle = () => {
    const request = new Request();
    const url = `${import.meta.env.VITE_API_URL}/task/${task.id}`;
    const data = JSON.stringify({
      id: task.id,
      description: task.description,
      done: !task.done,
    });

    setIsChecked(!task.done);

    request.putAPI(url, data);
    store.todos.get(todolistId)?.toggleTaskDone(task.id);
  };

  return (
    <Flex
      key={task.id}
      justifyContent="space-between"
      bg="#f9f9f9"
      borderRadius="5px"
      p="10px"
    >
      <Checkbox isChecked={isChecked} onChange={handleOnToggle}>
        {task.description}
      </Checkbox>
      <RemoveTask todolist_id={todolistId} task={task} />
    </Flex>
  );
};

export default TaskComponent;
