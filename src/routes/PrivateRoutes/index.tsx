import Products from "../../pages/products";
import CreateProduct from "../../pages/products/create/index.tsx";
import CreateProductDetails from "../../pages/products/details/create/index.tsx";
import { Navigate, Outlet, RouteObject, useNavigate, useResolvedPath } from "react-router-dom";
import { useEffect } from "react";

import NotFound from "../../pages/notFound.tsx";
import Home from "../../pages/home/index.tsx";
import Employees from "../../pages/employees/index.tsx";
import PrivateLayout from "../../components/PrivateLayout/index.tsx";
import { useAppContext } from "../../context/appContext/hook/useAppContext.ts";
import { useNotification } from "../../context/notifyContext/hook/useNotification.ts";
import { roles } from "../../consts/privilege.ts";

export const PrivateRoute = () => {
  const appContext = useAppContext();
  const notification = useNotification();
  const navigate = useNavigate();
  const path = useResolvedPath(window.location.pathname).pathname.split('/')[1];
  const user = appContext.user;
  const privilege = roles[user.role as keyof typeof roles];
  
  useEffect(() => {
    if (privilege?.indexOf(path) === -1) {
      notification.notify('Você não tem autorização para acessar esta página');
      navigate('/');
    }
  }, [path, navigate, notification, privilege]);
  return appContext.isLogged ? <Outlet/> : <Navigate to={'/login'}/>;
  }

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
            path: '/employees',
            element: <Employees />
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
