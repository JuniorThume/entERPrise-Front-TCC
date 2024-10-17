import imagem from "../../../../assets/fundo-sem-imagem.png";
import { IProduct } from "../../../../interfaces/IProduct";
import EditProductModal from "../../../EditProductModal";
// import { API } from "../../../../api/axios";
import DeleteProductModal from "../../../DeleteProductModal";
import ShowProductModal from "../../../ShowProductModal";

interface IShapeProductProps {
  product: IProduct;
}

const ListedProduct = ({ product }: IShapeProductProps) => {
  
  const buffer = new Uint8Array(product.image); // ou um ArrayBuffer

  // Converte o buffer para um Blob
  const blob = new Blob([buffer], { type: 'image/*' }); // Define o tipo MIME conforme o seu dado
  // Agora você pode usar o Blob, por exemplo, para exibir uma imagem
  const imageUrl = URL.createObjectURL(blob);
  return (
    <li className="text-sm mg-4 p-1 border border-black rounded-2xl text-black grid grid-cols-[auto_1fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center m-2 text-center"> 
      <div className="rounded-full">
        <img
          src={product.image ? imageUrl : imagem}
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
        <ShowProductModal product={product} />
        <EditProductModal product={product}/>
        <DeleteProductModal product={product} />
      </div>
    </li>
  );
};

export default ListedProduct;
