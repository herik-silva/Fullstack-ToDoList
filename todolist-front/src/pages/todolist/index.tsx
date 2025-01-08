import { Container, Flex } from "@chakra-ui/react";
import Template from "../../layout/global";
import CreateTodolist from "../../components/create-todolist";
import { Provider, rootStore } from "../../model/rootstore";
import TodoView from "../../components/todo-view";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import Request from "../../core/utils/Request";

const ToDoListPage = observer(() => {
  useEffect(() => {
    const request = new Request();
    request
      .getAPI(`${import.meta.env.VITE_API_URL}/todolist`)
      .then((value) => rootStore.updateTodolist(value));
  }, []);

  return (
    <Provider value={rootStore}>
      <Template>
        <Container maxW="container.xl" flexDir="column" gap="10px" py="10px">
          <Flex flexWrap="wrap" gap="10px">
            {rootStore.todolist.map((item) => (
              <TodoView
                key={item.id}
                todolist={item}
                w={{ base: "full", md: "300px" }}
              />
            ))}
          </Flex>
          <Flex justifyContent="end" mt="10px">
            <CreateTodolist />
          </Flex>
        </Container>
      </Template>
    </Provider>
  );
});

export default ToDoListPage;
