import { createContext, useState } from "react";

export interface IQuery {
  name?: string | null;
  description?: string | null;
  category?: string | null;
  material?: string | null;
  genre?: string | null;
  brand?: string | null;
  page?: string | null;
  limit?: string | null;
}

type PropsSearchContext = {
  query: URLSearchParams;
  setQuery: (query: URLSearchParams) => void;
  current_page: number;
  setPage: (page: number) => void
}

const defaultValues = {
  query: new URLSearchParams(location.search),
  setQuery: () => { },
  current_page: 1,
  setPage: () => { }
};

const SearchContext = createContext<PropsSearchContext>(defaultValues);

const SearchContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [query, setQuery] = useState(defaultValues.query);
  const [current_page, setPage] = useState(defaultValues.current_page);
  
  return (
    <SearchContext.Provider value={{ query, setQuery, current_page, setPage }}>
      { children }
    </SearchContext.Provider>
  );
}

export { SearchContext };
export default SearchContextProvider;

