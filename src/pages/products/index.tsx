import ProductsList from "../../components/ProductsList";
import Search from "../../components/Search";
import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Products = () => {

  return (
    <div>
      <div className="flex flex-col w-[100%] gap gap-[10px]">
        <div className="self-start">
          <h2 className="text-3xl">Produtos</h2>
        </div>
        <Search />
        <Link to={'/products/create'} type="button" className="flex justify-between items-center bg-main w-[120px] mt-[10px] font-medium p-1">
          <p className="ml-1 text-white">Adicionar</p>
          <IoAddCircleOutline size={24} color="white"/>
        </Link>
      </div>
      <ProductsList />
      
    </div>
    
  );
}

export default Products;
