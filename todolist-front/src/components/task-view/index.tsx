import { Button } from "@chakra-ui/react";
import { TodolistAPIInstance } from "../../model/todolist";
import { useState } from "react";
import TaskViewModal from "../modals/task-view-modal";

type TaskViewProps = {
  todolist: TodolistAPIInstance;
};

const TaskView: React.FC<TaskViewProps> = ({ todolist }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnOpen = () => {
    setIsOpen(true);
  };
  const handleOnClose = () => setIsOpen(false);

  return (
    <>
      <Button variant="ghost" onClick={handleOnOpen}>
        Ver mais
      </Button>
      {isOpen && (
        <TaskViewModal
          handleOnClose={handleOnClose}
          isOpen={isOpen}
          todolist={todolist}
        />
      )}
    </>
  );
};

export default TaskView;
