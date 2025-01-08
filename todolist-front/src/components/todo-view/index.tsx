import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Flex,
  Text,
  CardProps,
} from "@chakra-ui/react";
import { TodolistAPIInstance } from "../../model/todolist";
import { RiTaskLine } from "react-icons/ri";
import RemoveTodolist from "../remove-todolist";
import TaskView from "../task-view";
import { observer } from "mobx-react-lite";

type TodoViewProps = CardProps & {
  todolist: TodolistAPIInstance;
};

const TodoView = observer<TodoViewProps>(({ todolist, ...args }) => {
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
            <Text>{todolist.task_length}</Text>
          </Flex>
          <Flex gap="10px" alignItems="center">
            <TaskView todolist={todolist} />
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
});

export default TodoView;
