import { Routes as BaseRoutes, Route } from "react-router-dom";
import { createElement } from "react";
import routesList from "./DTO";

const Routes = () => {
  return (
    <BaseRoutes>
      {routesList?.map((item) => {
        const element = createElement(item.element);

        return <Route key={item.path} path={item.path} element={element} />;
      })}
    </BaseRoutes>
  );
};

export default Routes;
