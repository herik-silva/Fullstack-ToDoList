import { Button, IconButton } from "@chakra-ui/react/button";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import { TaskInstance } from "../../model/todolist";
import Request from "../../core/utils/Request";
import { useMst } from "../../model/rootstore";
import { observer } from "mobx-react-lite";

type RemoveTodolistProps = {
  todolist_id: number;
  task: TaskInstance;
};

const RemoveTask = observer<RemoveTodolistProps>(({ todolist_id, task }) => {
  const [confirmDelete, setconfirmDelete] = useState(false);
  const store = useMst();

  const handleOnDelete = () => setconfirmDelete(true);

  const handleOnConfirm = () => {
    const url = `${import.meta.env.VITE_API_URL}/task/${task.id}`;
    const request = new Request();

    request.deleteAPI(url).then(() => store.removeTask(todolist_id, task.id));
  };

  return (
    <>
      {!confirmDelete ? (
        <IconButton
          variant="ghost"
          icon={<FaTrashAlt />}
          colorScheme="red"
          onClick={handleOnDelete}
          size="sm"
          aria-label="Excluir todolist"
        />
      ) : (
        <Button
          variant="solid"
          colorScheme="red"
          onClick={handleOnConfirm}
          size="sm"
        >
          Confirmar
        </Button>
      )}
    </>
  );
});

export default RemoveTask;
