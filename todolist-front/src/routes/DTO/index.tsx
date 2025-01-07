import ToDoListPage from "../../pages/todolist";

type RouteProps = {
  path: string;
  element: React.FC;
};

const routesList: RouteProps[] = [{ path: "/", element: ToDoListPage }];

export default routesList;
