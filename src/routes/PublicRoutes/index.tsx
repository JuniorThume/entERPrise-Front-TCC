import { Navigate, Outlet, RouteObject } from "react-router-dom";
import Login from "../../pages/login";
import { useAuth } from "../../context/AppContext";


const PublicRoute = () => {
  const { isLogged } = useAuth();
  return (!isLogged ? <Outlet/> : null);
}

const PublicRoutes: Array<RouteObject> = ([
  {
    path: "/",
    element: <PublicRoute />,
    children: [
      {
        path: '/login',
        element: <Login />, 
      }
    ],
    errorElement: <Navigate replace to={'/login'}/>
  }
])

export { PublicRoute };

export default PublicRoutes;
