import Products from "../../pages/products";
import CreateProduct from "../../pages/products/create/index.tsx";
import CreateProductDetails from "../../pages/products/details/create/index.tsx";
import { Navigate, Outlet, RouteObject } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../../context/appContext/AppContext.tsx";
import NotFound from "../../pages/notFound.tsx";
import Home from "../../pages/home/index.tsx";
import Employees from "../../pages/employees/index.tsx";
import PrivateLayout from "../../components/PrivateLayout/index.tsx";

export const PrivateRoute = () => {
  const { isLogged } = useContext(AppContext);
  return isLogged ? <Outlet /> : <Navigate to={"/login"} />;
};

const PrivateRoutes: Array<RouteObject> = [
  {
    id: "privateRoutes",
    element: <PrivateRoute />,
    children: [
      {
        element: <PrivateLayout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/products",
            element: <Products />,
          },
          {
            path: "/products/create",
            element: <CreateProduct />,
          },
          {
            path: "/products/:id/details",
            element: <CreateProductDetails />,
          },
          {
            path: "/",
            children: [
              {
                path: '/employees',
                element: <Employees />,
              }
            ]
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
    ],
  },
];

export default PrivateRoutes;
