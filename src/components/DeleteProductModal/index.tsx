import { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { IProduct } from "../../interfaces/IProduct";
import { FaRegTrashAlt } from "react-icons/fa";
import { API } from "../../api/axios";

interface IDeleteModal {
  product: IProduct;
  refreshFunc: () => void;
}

const DeleteProductModal = ({ product, refreshFunc }: IDeleteModal) => {
  const [modalState, setModalState] = useState<boolean>(false);
  const handleDelete = async (id: number) => {
    await API.delete(`/products/${id}`)
    setModalState(false);
    refreshFunc()
  }

  return (
    <button
      className="rounded-md p-1 mx-1 hover:scale-110"
      onClick={() => setModalState(true)}
    >
      <FaRegTrashAlt size={20} color="#fb7185" />
      <ModalWrapper modalState={modalState} setModalState={setModalState}> 
        <h2>Você deseja remover este produto do estoque?</h2>
        <div className="w-[20vw] flex gap-x-[5px] self-center mt-[5px]">
          <button type="submit" className="w-full bg-remove text-white" onMouseUp={() => handleDelete(product.id)}>Excluir</button>
          <button type="button" className="w-full bg-white text-balck border" onMouseUp={() => setModalState(false)}>Cancelar</button>
        </div>
      </ModalWrapper>
    </button>
  );
};

export default DeleteProductModal;
