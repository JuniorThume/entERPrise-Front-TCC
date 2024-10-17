import { Modal } from "@mui/material";
import { MdOutlineCancel } from "react-icons/md";

interface IModalProps {
  modalState: boolean;
  setModalState: (state: boolean) => void;
  children: React.ReactNode
}

const ModalWrapper = ({ modalState, setModalState, children }: IModalProps) => {

  return (
    <Modal
      open={modalState}
      onClose={() => setModalState(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex justify-center items-center text-black w-[80%] justify-self-center"
    >
      <div className="p-[20px] bg-white flex flex-col">
        <button
          type="button"
          onMouseUp={() => setModalState(false)}
          className="self-end"
        >
          <MdOutlineCancel size={24} color="gray" />
        </button>
        { children }
      </div>
    </Modal>
  );
};

export default ModalWrapper;
