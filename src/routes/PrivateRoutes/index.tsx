import Products from "../../pages/products";
import CreateProduct from "../../pages/createProduct";
import CreateProductDetails from "../../pages/createProductDetails";
import { Navigate, Outlet, RouteObject } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../../context/appContext/AppContext.tsx";
import NotFound from "../../pages/notFound.tsx";
import Home from "../../pages/home/index.tsx";

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
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export default PrivateRoutes;
