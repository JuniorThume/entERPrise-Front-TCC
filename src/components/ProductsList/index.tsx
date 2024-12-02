import { IProduct } from "../../interfaces/IProduct";
import ListedProduct from "./components/ListedProduct";
import NoneProductFound from "../NoneProductFound";
import Loading from "../Loading";
import { IPaginate } from "../../pages/products";

interface IProductListProps {
  refreshState: boolean;
  refreshFunc: () => void;
  isLoading: boolean;
  productsArr: IProduct[];
  pagination: IPaginate;
}

const ProductList = ({
  refreshFunc,
  isLoading,
  productsArr,
}: IProductListProps) => {
  return (
    <>
      <div className="grid grid-rows-[auto_auto] max-h-[450px]">
        <ul className="mt-4 py-3 h-max w-[90%] bg-white ">
          {isLoading ? (
            <Loading />
          ) : productsArr.length !== 0 ? (
            <>
              <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_1fr_1fr_1fr] text-center px-5 italic text-xs">
                <span>Imagem</span>
                <span>Código</span>
                <span>Marca</span>
                <span>Categoria</span>
                <span>Gênero</span>
                <span>Opções</span>
                <span className="justify-self-end col-span-2 mr-10">Ações</span>
              </div>
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
