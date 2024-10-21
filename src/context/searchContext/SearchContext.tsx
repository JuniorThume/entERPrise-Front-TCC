import { createContext, useState } from "react";

interface IQuery {
  name?: string | null;
  description?: string | null;
  category?: string | null;
  material?: string | null;
  gender?: string | null;
  brand?: string | null;
  page?: number | null;
  limit?: number | null;
}

type PropsSearchContext = {
  query: IQuery;
  setQuery: (query: IQuery) => void;
}

const defaultValues = {
  query: {
    brand: null,
    description: null,
    category: null,
    material: null,
    gender: null,
    name: null,
    limit: null,
    page: null,
  } as IQuery,
  setQuery: () => {},
};

const SearchContext = createContext<PropsSearchContext>(defaultValues);

const SearchContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [query, setQuery] = useState(defaultValues.query);
  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      { children }
    </SearchContext.Provider>
  );
}

export { SearchContext };
export default SearchContextProvider;

