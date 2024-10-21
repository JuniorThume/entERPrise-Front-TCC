import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { jwtData } from '../pages/login';
import Loading from '../components/Loading';

export type UserType = {
  username: string;
  id: number;
}

type PropsAppContext = {
  user: UserType;
  token: string | null;
  isLogged: boolean;
  setToken: (token: string | null) => void;
  setUser: (user: UserType) => void;
  setIsLogged: (state: boolean) => void;
}

interface IAppContext {
  children: React.ReactNode,
}

const DEFAULT_VALUE = {
  user: {
    username: '',
    id: 0,
  },
  token: null,
  isLogged: false,
  setToken: () => {},
  setUser: () => {},
  setIsLogged: () => {}
}

const useAuth = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AppContext = createContext<PropsAppContext>(DEFAULT_VALUE);

const AppContextProvider = ({ children }: IAppContext) => {
  const [user, setUser] = useState(DEFAULT_VALUE.user);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(Cookies.get('logged') ? true : false);
  
  useEffect(() => {
    const has_cookie = Cookies.get('user_token');
    setToken(has_cookie || null);
    if (has_cookie) {
      const user_data: jwtData = jwtDecode(has_cookie)
      setUser(user_data.user)
    };
    if (!isLogged) {
      Cookies.remove('logged');
      Cookies.remove('user_token');
    }
    setIsLoading(false);
  }, [isLogged])
  return (
    <AppContext.Provider value={
      {
        user,
        isLogged,
        token,
        setToken,
        setUser,
        setIsLogged
      }
    }>
      { isLoading ? <Loading /> : children }
    </AppContext.Provider>
  );
}

export default AppContext;
export { AppContextProvider, useAuth };
