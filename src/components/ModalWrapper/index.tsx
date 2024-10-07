import { Modal } from "@mui/material";
import { ReactElement } from "react";
import Input from "../Input";
import image from '../../assets/fundo-sem-imagem.png';

interface IModalProps {
  modalState: boolean;
  setModalState: (state: boolean) => void;
  childrenElement: ReactElement
}

const ModalWrapper = ({ modalState, setModalState } :IModalProps) => {
  

  return (
    <Modal
      open={modalState}
      onClose={() => setModalState(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex justify-center items-center text-black overflow-y-scroll"
    >
      <div className="p-[20px] bg-white">
        <button type="button" onMouseUp={() => setModalState(false)}>X</button>
        <form action="" className="w-full bg-white text-sm">

          <div className="grid grid-rows-2 grid-cols-2 gap-[10px] text-black bg-white">
            <Input type="text" label="Nome" />
            <Input type="text" label="Categoria"/>
            <Input type="text" label="Marca"/>
            <Input type="text" label="Material"/>  
          </div>
          <div className="mt-[10px]">
            <label htmlFor="update_description">Descrição</label>
            <textarea name="update_description" id="update_description" className="bg-white w-full resize-none border p-1" ></textarea>
          </div>
          <div className="flex flex-col justify-center items-center ">
            <img src={image} alt="Imagem do Produto" className="w-full h-[200px]" />
            <input type="file" name="" id="" className="text-[10px]"/>
          </div>
          <div className="grid grid-cols-2 mt-[15px]">
            <button type="submit" className="bg-dark_green text-white">Alterar</button>
            <button className="bg-blood_red text-white" onMouseUp={() => setModalState(false)} type="button">Cancelar</button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default ModalWrapper;
