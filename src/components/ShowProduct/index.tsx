import imagem from '../../assets/fundo-sem-imagem.png';
import { IProduct } from '../../interfaces/IProduct';
import { base64ToBlob } from '../../utils/base64ToBlob';

interface IShowProduct {
  product: IProduct;
  onModal: boolean;
}

const ShowProduct = ({ product, onModal }: IShowProduct) => {
  // const productImage = product.image ? base64ToBlob(product.image, "image/*") : imagem;
  // alert(typeof product.image)
  return (
    <div className={`grid grid-cols-[auto_2fr_1fr] w-full p-2 border border-black rounded-xl mt-3`}>
      <div className={`${onModal ? "text-lg" : "text-sm"} `}>
        <h3 className="pt-1 italic">{product.name}</h3>
        <div className="text-base mt-[10px] pl-2 font-semibold gap-y-[2px]">
          <p>
            Categoria: <span className="font-normal">{product.category}</span>
          </p>
          <p>
            Marca: <span className="font-normal">{product.brand}</span>
          </p>
          <p>
            Material: <span className="font-normal">{product.material}</span>
          </p>
          <p>
            Gênero: <span className="font-normal">{product.genre}</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-self-center px-8 text-lg">
        <span className="font-semibold text-base text-center">Descrição</span>
        <p className="mt-3 text-sm text-justify"> { product.description ? product.description : 'Não existe descrição para este produto' }
        </p>
      </div>
      <div className={`justify-self-end`}>
        <img src={imagem} alt="Imagem do produto" className={`rounded-xl ${onModal ? "w-[250px]" : "w-[150px]"}`} />
      </div>
    </div>
  );
};

export default ShowProduct;
