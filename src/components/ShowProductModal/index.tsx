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
      className="rounded-md p-1 mx-1 hover:scale-110"
      onClick={() => setModalState(true)}
    >
      <TbAspectRatio size={24} color="gray" />
      <ModalWrapper modalState={modalState} setModalState={setModalState}>
        <ShowProduct product={product} onModal={true} />
      </ModalWrapper>
    </button>
  );
};

export default ShowProductModal;
