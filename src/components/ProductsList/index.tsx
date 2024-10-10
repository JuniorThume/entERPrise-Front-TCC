import { useEffect, useState } from "react";
import { IProduct } from "../../interfaces/IProduct";
import ListedProduct from "./components/ListedProduct";
import NoneProductFound from "../NoneProductFound";

const ProductsList = () => {
  const [productsArr, setProducts] = useState<[IProduct] | []>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <ul className="mt-4 py-3 h-auto w-[90%] bg-white ">
      {productsArr ? (
        productsArr.map((productItem: IProduct, index: number) => {
          return <ListedProduct product={productItem} key={index} />;
        })
      ) : (
        <NoneProductFound />
      )}
    </ul>
  );
};

export default ProductsList;
