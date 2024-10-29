import PrivateLayout from "../../components/PrivateLayout";
import ProductsList from "../../components/ProductsList";
import Search from "../../components/Search";
import { IoAddCircleOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import SearchContext from "../../context/searchContext/SearchContext";
import { useEffect, useState } from "react";
import { useSearch } from "../../context/searchContext/hook/useSearch";
import { AxiosError } from "axios";
import { API, refreshTokenRequest } from "../../api/axios";
import { IProduct } from "../../interfaces/IProduct";
import { setStringImage } from "../../utils/setStringImage";
import { useAppContext } from "../../context/appContext/hook/useAppContext";
export interface IPaginate {
  current_page: number;
  next_page?: number | null;
  prev_page?: number | null;
  total_pages: number;
}
interface IResponsePaginate extends IPaginate {
  data: IProduct[];
}

const Products = () => {
  const [productsArr, setProducts] = useState<IProduct[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const contextApp = useAppContext();
  const contextSearch = useSearch();

  const [pagination, setPagination] = useState<IPaginate>({
    current_page: 1,
    next_page: null,
    prev_page: null,
    total_pages: 1,
  });

  const handleSelectedPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const page = e.currentTarget.innerText;
    const refresh_query = contextSearch.query;
    if (page !== '1') {
      refresh_query.delete('page');
      refresh_query.set('page', page);
    } else {
      refresh_query.delete('page');
    }
    contextSearch.setQuery(refresh_query);
    refreshProductList();
    return;
  }

  const refreshProductList = () => {
    setRefresh((refreshState) => !refreshState);
  };

  useEffect(() => {
    const handleRefresh = async () => {
      if (contextApp.token) {
        navigate(`?${contextSearch.query.toString()}`, { replace: true });
        await API.get(
          `/products${contextSearch.query ? "?" + contextSearch.query : ""}`,
          {
            headers: {
              Authorization: `Bearer ${contextApp.token}`,
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => {
            return response.data;
          })
          .then((result: IResponsePaginate) => {
            result.data.forEach((item: IProduct) => {
              if (item.image) {
                item.image = setStringImage(item.image);
              }
            });
            setIsLoading(false);
            setPagination({
              next_page: result?.next_page,
              prev_page: result?.prev_page,
              current_page: result.current_page,
              total_pages: result.total_pages,
            });
            setProducts(result.data);
          })
          .catch(async (err: AxiosError) => {
            if (err.status === 401) {
              refreshTokenRequest(contextApp.setToken);
            }
            console.log(err);
          });
      }
    };
    handleRefresh();
  }, [contextApp, contextSearch.query, refresh, navigate]);
  return (
    <PrivateLayout>
      <SearchContext>
        <div className="flex flex-col w-[100%] gap gap-[10px]">
          <div className="self-start">
            <h2 className="text-3xl">Produtos</h2>
          </div>
          <Search refreshFunc={refreshProductList} />
          <Link
            to={"/products/create"}
            type="button"
            className="flex justify-between items-center bg-main w-[120px] mt-[10px] font-medium p-1"
          >
            <p className="ml-1 text-white">Adicionar</p>
            <IoAddCircleOutline size={24} color="white" />
          </Link>
        </div>
        <ProductsList
          pagination={pagination}
          isLoading={isLoading}
          productsArr={productsArr}
          refreshState={refresh}
          refreshFunc={refreshProductList}
        />
        <div className="w-full items-center justify-center text-black justify-self-center mb-[50px]">
          {pagination.total_pages > 1 && (
            <div className="flex justify-center">
              {Array.from({ length: pagination.total_pages }, (_, index) => (
                <button
                  key={index}
                  onClick={(e) => handleSelectedPage(e)}
                  className={`ml-3  w-[30px] h-[30px] flex justify-center items-center ${pagination.current_page === index + 1 ? 'bg-main text-white rounded-[100%] outline outline-main border border-white p-2' : ''}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </SearchContext>
    </PrivateLayout>
  );
};

export default Products;
