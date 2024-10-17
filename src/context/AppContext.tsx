import React, { createContext, useState } from 'react';

export type UserType = {
  username: string;
  id: number;
  token: string;
}

type PropsAppContext = {
  user: UserType;
  isLogged: boolean;
  setUser: (user: UserType) => void;
  setIsLogged: (state: boolean) => void;
}

interface IAppContext {
  children: React.ReactNode,
  isLogged: boolean;
  setUser: (user: UserType) => void;
  setIsLogged: (state: boolean) => void;
}


const DEFAULT_VALUE = {
  user: {
    username: '',
    id: 0,
    token: ''
  },
  isLogged: false,
  setUser: () => {},
  setIsLogged: () => {}
}

const AppContext = createContext<PropsAppContext>(DEFAULT_VALUE);

const AppContextProvider = ({ children, isLogged, setIsLogged, }: IAppContext) => {
  const [user, setUser] = useState(DEFAULT_VALUE.user);

  return (
    <AppContext.Provider value={{
      user,
      isLogged,
      setUser,
      setIsLogged
    }
    }>
      { children }
    </AppContext.Provider>
  );
}

export default AppContext;
export { AppContextProvider };
