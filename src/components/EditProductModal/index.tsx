import { MdOutlineModeEdit } from "react-icons/md";
import ModalWrapper from "../ModalWrapper";
import { useState } from "react";
import { IProduct } from "../../interfaces/IProduct";
import ProductForm from "../ProductForm";
import { ProductFormData } from "../../zodSchemas/product/types";

interface IEditProductProps {
  product: IProduct;
}

const EditProductModal = ({ product } :IEditProductProps) => {
  const [modalState, setModalState] = useState<boolean>(false);
  const handleUpdateProduct = (data :ProductFormData) => {
    alert(data.product_name);
  };
  return (
    <button
      className="rounded-md bg-edit p-1 mx-1"
      onClick={() => setModalState(true)}
    >
      <MdOutlineModeEdit size={24} />
      <ModalWrapper
        modalState={modalState}
        setModalState={setModalState}
        children={
          <ProductForm onSubmit={handleUpdateProduct} onUpdate={true} closeModal={setModalState} product={product} />
        }
      />
    </button>
  );
};

export default EditProductModal;
