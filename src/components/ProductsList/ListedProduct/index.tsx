import imagem from "../../../assets/fundo-sem-imagem.png";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { TbAspectRatio } from "react-icons/tb";
import { IProduct } from "../../../interfaces/IProduct";

interface IShapeProductProps {
  product: IProduct;
}

const ListedProduct = ({product}: IShapeProductProps) => { 
  
  return (
    <li className="text-sm mg-4 p-1 border border-black rounded-2xl text-black flex justify-between items-center m-2 font-list_product">
      <div className="rounded-full">
        <img
          src={product?.image_url ? product.image_url : imagem}
          alt="Imagem do Produto"
          className="w-16 rounded-full"
        />
      </div>
      <div>{ product?.name }</div>
      <div>{ product?.brand }</div>
      <div>{ product?.category }
      </div>
      <div><span className="font-medium">R$</span> 9,90</div>
      <div>{ product?.genre }</div>
      <div className="flex ">
        <button className="rounded-md p-1 bg-expand mx-1">
          <TbAspectRatio size={24} />
        </button>
        <button className="rounded-md bg-edit p-1 mx-1"><MdOutlineModeEdit size={24}/></button>
        <button className="bg-main rounded-md bg-remove p-1 mx-1"><FaRegTrashAlt size={20}/></button>
      </div>
    </li>
  );
};

export default ListedProduct;
