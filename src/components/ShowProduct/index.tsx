import { useNavigate } from 'react-router-dom';
import imagem from '../../assets/fundo-sem-imagem.png';
import { IProduct } from '../../interfaces/IProduct';

interface IShowProduct {
  product: IProduct;
  onModal: boolean;
}

const ShowProduct = ({ product, onModal }: IShowProduct) => {
  const navigate = useNavigate();
  return (
    <div className={`${!onModal ? "w-[75%]" : "w-full"} grid grid-cols-[200px_400px_auto] self-center p-2 border border-black rounded-xl mt-3`}>
      <div className={`${onModal && "text-lg flex flex-col justify-between"} `}>
        <h3 className="pt-1 text-md italic">{product?.name}</h3>
        <div className="text-sm mt-[10px] p-3 font-semibold gap-y-[2px]">
          <p>
            Categoria: <span className="font-normal">{product?.category}</span>
          </p>
          <p>
            Marca: <span className="font-normal">{product?.brand}</span>
          </p>
          <p>
            Material: <span className="font-normal">{product?.material}</span>
          </p>
          <p>
            Gênero: <span className="font-normal">{product?.genre}</span>
          </p>
        </div>
        {onModal && <button onClick={() => navigate(`/products/${product.id}/details`)} className='bg-blue_light text-white w-full rounded-[20px] text-sm h-[30px]'>
          Ver opções
        </button>}
      </div>
      <div className="flex flex-col justify-self-center px-8 text-lg">
        <span className="font-semibold text-base text-center">Descrição</span>
        <p className="mt-3 text-sm text-justify"> { product?.description ? product?.description : 'Não existe descrição para este produto' }
        </p>
      </div>
      <div className={`justify-self-end`}>
        <img src={product?.image ? product.image : imagem} alt="Imagem do produto" className={`rounded-xl ${onModal ? "w-[250px]" : "w-[150px]"}`} />
      </div>
    </div>
  );
};

export default ShowProduct;
