import { useEffect, useState } from "react";
import ProductsList from "../../components/ProductsList";
import Search from "../../components/Search";
import { IoAddCircleOutline } from "react-icons/io5";
import { IProduct } from "../../interfaces/IProduct";
import { Link } from "react-router-dom";
import NoneProductFound from "../../components/NoneProductFound";

const Products = () => {

  // const [buttonClicked, setButtonClicked] = useState(false);
  const [productsArr, setProducts] = useState<[IProduct] | []>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(err => console.log(err.message));
  }, []);

  return (
    <div>
      <div className="flex flex-col w-[100%] gap gap-[10px]">
        <div className="self-start">
          <h2 className="text-3xl">Produtos</h2>
        </div>
        <Search />
        <Link to={'/products/create'} type="button" className="flex justify-between items-center bg-main w-[120px] mt-[10px] font-medium p-1">
          <p className="ml-1">Adicionar</p>
          <IoAddCircleOutline size={24}/>
        </Link>
      </div>
      {productsArr.length == 0 ? <NoneProductFound /> : <ProductsList products={productsArr} />}
      
    </div>
    
  );
}

export default Products;
