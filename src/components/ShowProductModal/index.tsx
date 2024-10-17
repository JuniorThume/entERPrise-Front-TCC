import { useState } from "react";
import { TbAspectRatio } from "react-icons/tb";
import ModalWrapper from "../ModalWrapper";
import ShowProduct from "../ShowProduct";
import { IProduct } from "../../interfaces/IProduct";

interface IShowProductModalProps {
  product: IProduct;
}

const ShowProductModal = ({product}: IShowProductModalProps) => {
  const [modalState, setModalState] = useState<boolean>(false);
  return (
    <button
      className="rounded-md p-1 bg-expand mx-1"
      onClick={() => setModalState(true)}
    >
      <TbAspectRatio size={24} />
      <ModalWrapper modalState={modalState} setModalState={setModalState}>
        <ShowProduct product={product} onModal={true} />
      </ModalWrapper>
    </button>
  );
};

export default ShowProductModal;
