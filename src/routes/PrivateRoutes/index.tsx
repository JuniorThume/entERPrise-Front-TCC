
import Products from "../../pages/products";
import CreateProduct from "../../pages/createProduct";
import CreateProductDetails from "../../pages/createProductDetails";
import { Navigate, Outlet, RouteObject } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../../context/AppContext";


export const PrivateRoute = () => {
  const {isLogged} = useContext(AppContext);
  return (isLogged ? <Outlet /> : <Navigate to={'/login'}/>)
}

const PrivateRoutes: [RouteObject]  = ([
  {
    path: '/products',
    element: <PrivateRoute />,
    children: [
      {
        path: '/products',
        element: <Products />
      },
      {
        path: '/products/create', element:<CreateProduct />
      },
      { path: '/products/:id/details', element: <CreateProductDetails /> }
    ],
    errorElement: <h1>problema com rotas publi</h1>

  }
])

export default PrivateRoutes;
