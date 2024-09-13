import { MdNavigateNext } from "react-icons/md";
import image from '../../assets/fundo-sem-imagem.png';
import { MdOutlinePlaylistAdd } from "react-icons/md";
import CreateDetails from "../../components/CreateDetails";
import { useState } from "react";
import ShowDetails from "../../components/ShowDetails";

const CreateProductDetails = () => {

  const [createDetailsStatus, setCreateDetailsStatus] = useState(false);

  const CreateDetailClickHandler = () => {
    if (createDetailsStatus) return setCreateDetailsStatus(false)
    return setCreateDetailsStatus(true);
  }

  return (
    <div className='flex flex-col text-black'>
      <div className='flex items-center'>
        <h2 className='text-lg'>Cadastrar um novo produto</h2>
        <MdNavigateNext size={20}/>
        <h3 className='text-sm opacity-[70%]'>Adicionar detalhes ao produto</h3>
      </div>
      <div className='flex justify-between border border-black p-2 rounded-xl mt-3'>
        <div className="">
          <h3 className="text-2xl pl-2 pt-1">NOME DO PRODUTO</h3>
          <div className="pl-8">
            <p className="font-semibold mt-1 text-sm">Categoria: <span className="text-s font-normal">{'categoria'}</span></p>
            <p className="font-semibold mt-1 text-sm">Marca: <span className="text-s font-normal">{'marca' }</span></p>
            <p className="font-semibold mt-1 text-sm">Material: <span className="text-s font-normal">{'marca' }</span></p>
            <p className="font-semibold mt-1 text-sm">Gênero: <span className="text-s font-normal">{'marca' }</span></p>
          </div>
        </div>
        <div className="w-[400px] flex flex-col">
          <span className="font-semibold text-sm text-center">Descrição</span>
          <p className="mt-3 text-xs text-justify">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam vitae molestias quae non tenetur quam. Non ipsa debitis accusamus perferendis porro modi ab est, expedita cupiditate dolor quaerat nulla quasi!</p>
        </div>
        <div className="">
          <img src={image} alt="Imagem do produto" className="w-[150px] rounded-xl " />
        </div>

      </div>
      <div className="flex justify-end">
        <button onClick={CreateDetailClickHandler} className="text-sm w-[20%] flex justify-center items-center border border-white rounded-md mt-3 p-1 bg-main text-white ">
          <span className="pr-2">Adicionar detalhes</span>
          <MdOutlinePlaylistAdd size={24}/>
        </button>
      </div>
      {createDetailsStatus ? <CreateDetails onClick={CreateDetailClickHandler} /> : null}
      <ShowDetails />
    </div>
  );
}

export default CreateProductDetails;
