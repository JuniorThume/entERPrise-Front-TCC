import { Navigate, Outlet, RouteObject } from "react-router-dom";
import Login from "../../pages/login";
import { useAppContext } from "../../context/appContext/hook/useAppContext";

const PublicRoute = () => {
  const { isLogged } = useAppContext();
  return !isLogged ? <Outlet /> : <Navigate to="/" />;
};

const PublicRoutes: Array<RouteObject> = [
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
];

export { PublicRoute };

export default PublicRoutes;
