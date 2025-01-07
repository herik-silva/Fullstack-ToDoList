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
        colorScheme="green"
        onClick={handleOnOpen}
        w="150px"
      >
        Nova Lista
      </Button>
      <CreateTodolistModal handleOnClose={handleOnClose} isOpen={isOpen} />
    </>
  );
};

export default CreateTodolist;
