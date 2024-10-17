import { useEffect, useState } from "react";
import { IProduct } from "../../interfaces/IProduct";
import ListedProduct from "./components/ListedProduct";
import NoneProductFound from "../NoneProductFound";
import { API } from "../../api/axios";

const Products = () => {
  const [productsArr, setProducts] = useState<[IProduct] | []>([]);

  const refreshProductList = async () => {
    await API.get("/products")
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .then((data: [IProduct]) => {
        data.forEach((item: IProduct) => {
          if (item.image) {
            item.image = `data:image/png;base64,${item.image}`
          }
        })
        setProducts(data);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    refreshProductList();
  }, []);

  return (
    <ul className="mt-4 py-3 h-auto w-[90%] bg-white ">
      {productsArr.length !== 0 ? (
        productsArr.map((productItem: IProduct, index: number) => {
          return (
            <ListedProduct
              product={productItem}
              key={index}
              refreshProductList={refreshProductList}
            />
          );
        })
      ) : (
        <NoneProductFound />
      )}
    </ul>
  );
};

export default Products;
