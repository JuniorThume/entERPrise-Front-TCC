import { Link, Navigate, Outlet, RouteObject } from "react-router-dom";
import Login from "../../pages/login";
import { useContext } from "react";
import AppContext from "../../context/AppContext";


const PublicRoute = () => {
  const { isLogged } = useContext(AppContext)
  return (!isLogged ? <Outlet/> : <Navigate to={'/products'}/>);
}

const PublicRoutes: [RouteObject] = ([
  {
    path: "/login",
    element: <PublicRoute />,
    children: [
      {
        path: '/login',
        element: <Login />
      }
    ],
    errorElement: <>
      <h1 className="text-black">Página indisponivel</h1>
      <Link to="/login">Voltar para a home</Link>
    </>
  }
])

export { PublicRoute };

export default PublicRoutes;
