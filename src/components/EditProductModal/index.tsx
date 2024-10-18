import { MdOutlineModeEdit } from "react-icons/md";
import ModalWrapper from "../ModalWrapper";
import { useState } from "react";
import { IProduct } from "../../interfaces/IProduct";
import ProductForm from "../ProductForm";
import { ProductFormData } from "../../zodSchemas/product/types";

interface IEditProductProps {
  product: IProduct;
  refreshFunc: () => void;
}

const EditProductModal = ({ product, refreshFunc } :IEditProductProps) => {
  const [modalState, setModalState] = useState<boolean>(false);
  const handleUpdateProduct = (data :ProductFormData) => {
    console.log(data)
    refreshFunc();
  };
  return (
    <button
      className="rounded-md p-1 mx-1 hover:scale-110"
      onClick={() => setModalState(true)}
    >
      <MdOutlineModeEdit size={24} color="#60a5fa" />
      <ModalWrapper
        modalState={modalState}
        setModalState={setModalState}
        modalTitle="Alterar Produto"
        children={
          <ProductForm onSubmit={handleUpdateProduct} onUpdate={true} closeModal={setModalState} product={product} />
        }
      />
    </button>
  );
};

export default EditProductModal;
