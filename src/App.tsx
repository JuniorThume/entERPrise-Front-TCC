import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import { useEffect, useState } from "react";
import PrivateRoutes from "./routes/PrivateRoutes/index.tsx";
import PublicRoutes from "./routes/PublicRoutes/index.tsx";
import { AppContextProvider } from "./context/AppContext.tsx";
import Cookies from 'js-cookie';

const routes = createBrowserRouter([...PublicRoutes, ...PrivateRoutes]);

const App = () => {
  const logged = Cookies.get('logged') ? true : false;
  const [isLogged, setIsLogged] = useState(logged);
  useEffect(() => {
    if (!isLogged) {
      Cookies.remove('logged');
      Cookies.remove('user_token');
    }
  }, [isLogged])
  return (
    <AppContextProvider setIsLogged={setIsLogged} isLogged={isLogged} >
      <RouterProvider router={routes} />
    </AppContextProvider>
  );
}

export default App;
