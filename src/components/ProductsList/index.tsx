import { IProduct } from "../../interfaces/IProduct";
import ListedProduct from "./ListedProduct";

interface IShapeProductProps {
  products: IProduct[];
}

const ProductsList = ({products}: IShapeProductProps) => {
  console.log(products, 11);
  return (
    <ul className='mt-4 py-3 h-auto w-[90%] bg-white '>
      {products.map((productItem: IProduct) => {   
        return <ListedProduct product={productItem}/>
      })}
    </ul>

  );
}

export default ProductsList;
