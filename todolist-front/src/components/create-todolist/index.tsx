import { Button } from "@chakra-ui/react/button";
import { MdFormatListBulletedAdd } from "react-icons/md";
import CreateTodolistModal from "../modals/create-todolist-modal";
import { useState } from "react";

const CreateTodolist: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnOpen = () => setIsOpen(true);
  const handleOnClose = () => setIsOpen(false);

  return (
    <>
      <Button
        variant="solid"
        leftIcon={<MdFormatListBulletedAdd />}
        bg="var(--btn-add-todolist-bg)"
        color="var(--btn-text-color)"
        onClick={handleOnOpen}
        transition=".1s ease-in all"
        w="150px"
        _hover={{
          bg: "var(--btn-add-todolist-bg-hover)",
        }}
      >
        Nova Lista
      </Button>
      <CreateTodolistModal handleOnClose={handleOnClose} isOpen={isOpen} />
    </>
  );
};

export default CreateTodolist;
