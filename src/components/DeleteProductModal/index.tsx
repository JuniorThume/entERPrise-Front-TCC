import { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { IProduct } from "../../interfaces/IProduct";
import { FaRegTrashAlt } from "react-icons/fa";

interface IDeleteModal {
  product: IProduct;
}

const DeleteProductModal = ({ product }: IDeleteModal) => {
  const [modalState, setModalState] = useState<boolean>(false);
  const handleDelete = (id: number) => {
    // Chama a API e remove o produto
    alert('Produto removido');
    setModalState(false); // Fecha o modal apos a exclusão
  }

  return (
    <button
      className="bg-main rounded-md bg-remove p-1 mx-1"
      onClick={() => setModalState(true)}
    >
      <FaRegTrashAlt size={20} />
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
