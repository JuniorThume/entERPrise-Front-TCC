import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import PrivateRoutes from "./routes/PrivateRoutes/index.tsx";
import PublicRoutes from "./routes/PublicRoutes/index.tsx";
import { AppContextProvider } from "./context/AppContext.tsx";

const routes = createBrowserRouter([...PublicRoutes, ...PrivateRoutes]);

const App = () => {
  return (
    <AppContextProvider>
      <RouterProvider router={routes} />
    </AppContextProvider>
  );
};

export default App;
