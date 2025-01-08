import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  Flex,
  Text,
  Heading,
  Stack,
} from "@chakra-ui/react";
import InputComponent from "../../input";
import useRequiredField from "../../../core/hooks/use-required-field";
import { TaskInstance, TodolistAPIInstance } from "../../../model/todolist";
import { useEffect } from "react";
import Request from "../../../core/utils/Request";
import TaskComponent from "../../task";
import { useMst } from "../../../model/rootstore";
import { observer } from "mobx-react-lite";

type TaskViewModalProps = {
  isOpen: boolean;
  handleOnClose: () => void;
  todolist: TodolistAPIInstance;
};

const TaskViewModal = observer<TaskViewModalProps>(
  ({ isOpen, handleOnClose, todolist }) => {
    const store = useMst();
    const taskInput = useRequiredField("", (value) => value.length > 0);

    const handleOnAddTask = () => {
      const url = `${import.meta.env.VITE_API_URL}/task`;
      const request = new Request();
      const data = {
        todolist_id: todolist.id,
        description: taskInput.bind.value,
      };

      const body = JSON.stringify(data);

      request.postAPI(url, body).then((response) => {
        const newTask = {
          id: response.task_id,
          description: data.description,
          done: false,
        } as TaskInstance;

        store.addTask(todolist.id, newTask);
      });
    };

    useEffect(() => {
      const url = `${import.meta.env.VITE_API_URL}/tasks/${todolist.id}`;
      const request = new Request();

      request
        .getAPI(url)
        .then((value) => store.updateTaskList(todolist.id, value));
    }, []);

    return (
      <>
        <Modal
          isOpen={isOpen}
          onClose={handleOnClose}
          size={{ base: "full", md: "xl" }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{todolist.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex flexDir="column" gap="5px">
                <Heading size="sm">Descrição</Heading>
                <Text ml="5px">{todolist.description}</Text>
              </Flex>
              <Flex flexDir="column" gap="5px" mt="5px">
                <Heading size="sm">Tarefas</Heading>
                <Stack spacing={2} ml="5px">
                  {store.todos.get(todolist.id)?.task_list.map((item) => (
                    <TaskComponent
                      key={item.id}
                      todolistId={todolist.id}
                      task={item}
                    />
                  ))}
                </Stack>
              </Flex>
              <Flex alignItems="end" gap="5px" mt="20px">
                <InputComponent
                  handleOnChangeValue={taskInput.bind.handleOnChange}
                  value={taskInput.bind.value}
                  label="Nova tarefa"
                  maxW="400px"
                />
                <Button
                  variant="solid"
                  onClick={handleOnAddTask}
                  bg="var(--btn-add-todolist-bg)"
                  color="var(--btn-text-color)"
                  transition=".1s ease-in all"
                  _hover={{
                    bg: "var(--btn-add-todolist-bg-hover)",
                  }}
                  w="200px"
                >
                  Adicionar Tarefa
                </Button>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  }
);

export default TaskViewModal;
