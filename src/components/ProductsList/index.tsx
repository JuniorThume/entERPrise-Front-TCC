import { IProduct } from "../../interfaces/IProduct";
import ListedProduct from "./ListedProduct";

interface IShapeProductProps {
  products: IProduct[];
}

const ProductsList = ({products}: IShapeProductProps) => {
  return (
    <ul className='mt-4 py-3 h-auto w-[90%] bg-white '>
      {products.map((productItem: IProduct, index: number) => {   
        return <ListedProduct product={productItem} key={index} />
      })}
    </ul>

  );
}

export default ProductsList;
