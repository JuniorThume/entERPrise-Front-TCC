import { useEffect, useState } from "react";
import { IProduct } from "../../interfaces/IProduct";
import ListedProduct from "./components/ListedProduct";
import NoneProductFound from "../NoneProductFound";
import { API } from "../../api/axios";
import Loading from "../Loading";
import { setStringImage } from "../../utils/setStringImage";
import NavigatePages from "./components/NavigatePages";
import { useSearch } from "../../context/searchContext/hook/useSearch";
import { useAppContext } from "../../context/appContext/hook/useAppContext";

interface IPaginate {
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
  const [pagination, setPagination] = useState<IPaginate>({
    current_page: 1,
    next_page: null,
    prev_page: null,
    total_pages: 1,
  });

  const refreshProductList = () => {
    setRefresh((state) => !state);
  };
  const contextApp = useAppContext();
  const contextSearch = useSearch();
  useEffect(() => {
    const handleRefresh = async () => {
      if (contextApp.token) {
        await API.get("/products", {
          headers: {
            Authorization: `Bearer ${contextApp.token}`,
          },
          params: {
            ...contextSearch.query,
          },
        })
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
          .catch((err) => console.log(err));
      }
    };
    handleRefresh();
  }, [contextApp, contextSearch.query, refresh]);
  return (
    <>
      <ul className="mt-4 py-3 h-auto w-[90%] bg-white ">
        {isLoading ? (
          <Loading />
        ) : productsArr.length !== 0 ? (
          <>
            {productsArr.map((productItem: IProduct, index: number) => {
              return (
                <ListedProduct
                  product={productItem}
                  key={index}
                  refreshProductList={refreshProductList}
                />
              );
            })}

            {pagination.total_pages > 1 && (
              <NavigatePages
                total_pages={pagination?.total_pages}
                current_page={pagination?.current_page}
              />
            )}
          </>
        ) : (
          <NoneProductFound />
        )}
      </ul>
    </>
  );
};

export default Products;
