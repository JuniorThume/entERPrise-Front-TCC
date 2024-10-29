import { IProduct } from "../../interfaces/IProduct";
import ListedProduct from "./components/ListedProduct";
import NoneProductFound from "../NoneProductFound";
import Loading from "../Loading";
import { IPaginate } from "../../pages/products";

interface IProductListProps {
  refreshState: boolean;
  refreshFunc: () => void,
  isLoading: boolean,
  productsArr: IProduct[];
  pagination: IPaginate;
}

const ProductList = ({ refreshFunc, isLoading, productsArr}: IProductListProps) => {
  
  return (
    <>
      <div className="grid grid-rows-[auto_auto] min-h-[450px]">
        <ul className="mt-4 py-3 h-max w-[90%] bg-white ">
          {isLoading ? (
            <Loading />
          ) : productsArr.length !== 0 ? (
            <>
              {productsArr.map((productItem: IProduct, index: number) => {
                return (
                  <ListedProduct
                    product={productItem}
                    key={index}
                    refreshProductList={refreshFunc}
                  />
                );
              })}
            </>
          ) : (
            <NoneProductFound />
          )}
        </ul>
      </div>
    </>
  );
};

export default ProductList;
