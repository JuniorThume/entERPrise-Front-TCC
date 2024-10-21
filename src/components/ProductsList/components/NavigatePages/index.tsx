import { Link } from "react-router-dom";
import { useSearch } from "../../../../context/searchContext/hook/useSearch";

interface INavigateProps {
  total_pages: number;
  current_page: number;
}

const NavigatePages = ({ total_pages, current_page }: INavigateProps) => {
  const navigation_elements = [];
  const contextSearch = useSearch();
  const query = contextSearch.query;
  for (let i = 1; i < total_pages + 1; i++) {
    navigation_elements.push(
      <Link
        to={i > 1 ? `/products?page=${i}` : "/products"}
        key={i}
        type="button"
        onClick={() => contextSearch.setQuery({ ...query, page: i })}
        className={`underline ${current_page == i ? "text-main" : null} `}
      >
        {i}
      </Link>
    );
  }

  return (
    <div className="flex justify-self-center gap-x-[10px] w-1/2 justify-center">
      {navigation_elements}
    </div>
  );
};

export default NavigatePages;
