import { MdOutlineModeEdit } from "react-icons/md";
import ModalWrapper from "../ModalWrapper";
import { useState } from "react";
import ProductForm from "../ProductForm";



const EditProductModal = () => {
  const [modalState, setModalState] = useState<boolean>(false);
  return (
    <button className="rounded-md bg-edit p-1 mx-1" onClick={() => setModalState(true)}>
      <MdOutlineModeEdit size={24} />
      <ModalWrapper modalState={modalState} setModalState={setModalState} childrenElement={<ProductForm onSubmit={() => { }}/>}/>
    </button>
    
  );
}

export default EditProductModal;
