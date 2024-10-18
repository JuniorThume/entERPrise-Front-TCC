import { useEffect, useState } from "react";
import { IProduct } from "../../interfaces/IProduct";
import ListedProduct from "./components/ListedProduct";
import NoneProductFound from "../NoneProductFound";
import { API } from "../../api/axios";
import { useAuth } from "../../context/AppContext";
import Loading from "../Loading";
import { setStringImage } from "../../utils/setStringImage";

const Products = () => {
  const [productsArr, setProducts] = useState<[IProduct] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const refreshProductList = () => {
    setRefresh(state => !state);
  };
  const context = useAuth();
  
  useEffect(() => {
      const handleRefresh = () => {
        if (context.token) {
          API.get("/products", {
            headers: {
              Authorization: `Bearer ${context.token}`,
            },
          })
            .then((response) => {
              console.log(response.data);
              return response.data;
            })
            .then((data: [IProduct]) => {
              data.forEach((item: IProduct) => {
                if (item.image) {
                  item.image = setStringImage(item.image);
                }
              });
              setIsLoading(false);
              setProducts(data);
            })
            .catch((err) => console.log(err));
        }
      };
      handleRefresh();
    ;
  }, [context, refresh]);
  return (
    <ul className="mt-4 py-3 h-auto w-[90%] bg-white ">
      {isLoading ? (
        <Loading />
      ) : productsArr.length !== 0 ? (
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

// if (context.token) {
//   API.get("/products", {
//     headers: {
//       Authorization: `Bearer ${context.token}`,
//     },
//   })
//     .then((response) => {
//       console.log(response.data);
//       return response.data;
//     })
//     .then((data: [IProduct]) => {
//       data.forEach((item: IProduct) => {
//         if (item.image) {
//           item.image = setStringImage(item.image);
//         }
//       });
//       setIsLoading(false);
//       setProducts(data);
//     })
//     .catch((err) => console.log(err));
// }
