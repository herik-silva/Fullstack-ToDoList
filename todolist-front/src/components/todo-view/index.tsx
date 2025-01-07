import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Flex,
  Text,
  CardProps,
  Button,
} from "@chakra-ui/react";
import { TodolistAPIInstance } from "../../model/todolist";
import { RiTaskLine } from "react-icons/ri";
import RemoveTodolist from "../remove-todolist";

type TodoViewProps = CardProps & {
  todolist: TodolistAPIInstance;
};

const TodoView: React.FC<TodoViewProps> = ({ todolist, ...args }) => {
  return (
    <Card key={todolist.id} {...args}>
      <CardHeader>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading size="md">{todolist.title}</Heading>
          <RemoveTodolist todolist={todolist} />
        </Flex>
      </CardHeader>
      <CardBody>
        <Flex justifyContent="space-between">
          <Flex alignItems="center" gap="5px">
            <RiTaskLine />
            <Text>{todolist.taskLength}</Text>
          </Flex>
          <Flex gap="10px" alignItems="center">
            <Button variant="ghost" colorScheme="gray">
              Ver mais
            </Button>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default TodoView;
