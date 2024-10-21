import { useContext } from "react";
import { SearchContext } from "../SearchContext";

const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within an AuthProvider");
  }
  return context;
};

export { useSearch };
