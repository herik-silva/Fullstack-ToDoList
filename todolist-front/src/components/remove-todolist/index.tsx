import { IconButton } from "@chakra-ui/react/button";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import ActionConfirmModal from "../modals/action-confirm-modal";
import { TodolistAPIInstance } from "../../model/todolist";
import Request from "../../core/utils/Request";
import { useMst } from "../../model/rootstore";

type RemoveTodolistProps = {
  todolist: TodolistAPIInstance;
};

const RemoveTodolist: React.FC<RemoveTodolistProps> = ({ todolist }) => {
  const [isOpen, setIsOpen] = useState(false);
  const store = useMst();

  const handleOnOpen = () => setIsOpen(true);
  const handleOnClose = () => setIsOpen(false);

  const handleOnConfirm = () => {
    const url = `${import.meta.env.VITE_API_URL}/todolist/${todolist.id}`;
    const request = new Request();

    request.deleteAPI(url).then(() => {
      store.removeTodo(todolist.id);
      handleOnClose();
    });
  };

  return (
    <>
      <IconButton
        variant="ghost"
        icon={<FaTrashAlt />}
        colorScheme="red"
        onClick={handleOnOpen}
        size="sm"
        aria-label="Excluir todolist"
      />
      <ActionConfirmModal
        handleOnClose={handleOnClose}
        isOpen={isOpen}
        handleOnConfirm={handleOnConfirm}
        itemName={todolist.title}
      />
    </>
  );
};

export default RemoveTodolist;
