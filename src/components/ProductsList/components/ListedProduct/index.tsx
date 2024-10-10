import imagem from "../../../../assets/fundo-sem-imagem.png";
import { FaRegTrashAlt } from "react-icons/fa";
import { TbAspectRatio } from "react-icons/tb";
import { IProduct } from "../../../../interfaces/IProduct";
import EditProductModal from "../../../EditProductModal";
import { API } from "../../../../api/axios";

interface IShapeProductProps {
  product: IProduct;
}

const ListedProduct = ({ product }: IShapeProductProps) => {
  const handleDelete = async () => {
    // alert(product.id)
    // await API.delete(`/products/${product.id}`)
  }
  return (
    //TODO Deixar elementos apenas no tamanho necessário
    <li className="text-sm mg-4 p-1 border border-black rounded-2xl text-black grid grid-cols-[auto_1fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center m-2 text-center"> 
      <div className="rounded-full">
        <img
          src={product?.image_url ? product.image_url : imagem}
          alt="Imagem do Produto"
          className="w-16 rounded-full"
        />
      </div>
      <div>{product?.name}</div>
      <div>{product?.brand}</div>
      <div>{product?.category}</div>
      <div>
        <span className="font-medium">R$</span> 9,90
      </div>
      <div>{product?.genre}</div>
      <div className="flex justify-self-end col-span-2">
        <button className="rounded-md p-1 bg-expand mx-1">
          <TbAspectRatio size={24} />
        </button>
        <EditProductModal product={product}/>
        <button className="bg-main rounded-md bg-remove p-1 mx-1" onClick={handleDelete}>
          <FaRegTrashAlt size={20} />
        </button>
      </div>
    </li>
  );
};

export default ListedProduct;
