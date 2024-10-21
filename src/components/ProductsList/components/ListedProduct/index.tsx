import imagem from "../../../../assets/fundo-sem-imagem.png";
import { IProduct } from "../../../../interfaces/IProduct";
import EditProductModal from "../../../EditProductModal";
// import { API } from "../../../../api/axios";
import DeleteProductModal from "../../../DeleteProductModal";
import ShowProductModal from "../../../ShowProductModal";

interface IShapeProductProps {
  product: IProduct;
  refreshProductList: () => void;
}

const ListedProduct = ({ product, refreshProductList }: IShapeProductProps) => {

  return (
    <li className="text-sm mg-4 p-1 border border-black rounded-2xl text-black grid grid-cols-[auto_1fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center m-2 text-center"> 
      <div className="rounded-full">
        <img
          src={product.image ? product.image : imagem}
          alt="Imagem do Produto"
          className="w-[60px] h-[60px] rounded-full"
        />
      </div>
      <div>{product?.name}</div>
      <div>{product?.brand}</div>
      <div>{product?.category}</div>
      <div>{product?.genre}</div>
      <div>+info</div>
      <div className="flex justify-self-end col-span-2">
        <ShowProductModal product={product} />
        <EditProductModal product={product} refreshFunc={refreshProductList}/>
        <DeleteProductModal product={product} refreshFunc={refreshProductList}/>
      </div>
    </li>
  );
};

export default ListedProduct;
