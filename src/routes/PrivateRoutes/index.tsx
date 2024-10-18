import Products from "../../pages/products";
import CreateProduct from "../../pages/createProduct";
import CreateProductDetails from "../../pages/createProductDetails";
import { Navigate, Outlet, RouteObject } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import NotFound from "../../pages/notFound.tsx";

export const PrivateRoute = () => {
  const { isLogged } = useContext(AppContext);
  return isLogged ? <Outlet /> : <Navigate to={"/login"} />;
};

const PrivateRoutes: Array<RouteObject> = [
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/create",
        element: <CreateProduct />
      },
      {
        path: "/products/:id/details",
        element: <CreateProductDetails />
      }
    ],
    errorElement: <NotFound />,
  },
];

export default PrivateRoutes;
