import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import PrivateRoutes from "./routes/PrivateRoutes/index.tsx";
import PublicRoutes from "./routes/PublicRoutes/index.tsx";
import { AppContextProvider } from "./context/appContext/AppContext.tsx";
import { NotificationProvider } from "./context/notifyContext/NotifyContext.tsx";

const App = () => {
  const router = createBrowserRouter([...PrivateRoutes, ...PublicRoutes]);

  return (
    <AppContextProvider>
      <NotificationProvider>
        <RouterProvider router={router} />
      </NotificationProvider>
    </AppContextProvider>
  );
};

export default App;
