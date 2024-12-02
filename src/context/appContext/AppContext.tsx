import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { jwtData } from "../../pages/login";

export type UserType = {
  username: string;
  id: number;
  role: string;
};

type PropsAppContext = {
  user: UserType;
  token: string | null;
  isLogged: boolean;
  path: string;
  setPath: (path: string) => void;
  setToken: (token: string | null) => void;
  setUser: (user: UserType) => void;
  setIsLogged: (state: boolean) => void;
};

interface IAppContext {
  children: React.ReactNode;
}

const DEFAULT_VALUE = {
  user: {
    username: "",
    id: 0,
    role: ""
  },
  token: null,
  isLogged: false,
  path: "",
  setPath: () => {},
  setToken: () => {},
  setUser: () => {},
  setIsLogged: () => {},
};

const AppContext = createContext<PropsAppContext>(DEFAULT_VALUE);

const AppContextProvider = ({ children }: IAppContext) => {
  const [user, setUser] = useState(DEFAULT_VALUE.user);
  const [token, setToken] = useState<string | null>(null);
  const [path, setPath] = useState(window.location.pathname.split("/")[1]);
  const [isLogged, setIsLogged] = useState(
    Cookies.get("access_token") ? true : false
  );

  useEffect(() => {
    const has_cookie = Cookies.get("access_token");
    setToken(has_cookie || null);
    if (has_cookie) {
      const user_data: jwtData = jwtDecode(has_cookie);
      setUser(user_data.user);
    }
    if (!isLogged) {
      Cookies.remove("access_token");
    }
  }, [isLogged]);
  return (
    <AppContext.Provider
      value={{
        user,
        isLogged,
        token,
        path,
        setPath,
        setToken,
        setUser,
        setIsLogged,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
export { AppContextProvider };
