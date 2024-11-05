import { useState } from "react";
import { ICredential } from "../../../../interfaces/ICredential";
import { API } from "../../../../api/axios";
import ModalWrapper from "../../../../components/ModalWrapper";
import { IEmployee } from "../../../../interfaces/IEmployee";
import { FaRegTrashAlt } from "react-icons/fa";

interface IDeleteCredentialModal {
  refreshCredentialList: () => void;
  credential: ICredential;
  employee: IEmployee;
}

const DeleteCredentialModal = ({
  refreshCredentialList,
  credential,
  employee
}: IDeleteCredentialModal) => {
  const [modalState, setModalState] = useState<boolean>(false);
  const deleteCredential = async (id: number) => {
    await API.delete(`/auth/credentials/${id}`)
      .then((response) => response.status)
      .then((status) => {
        console.log(status);
        if (status === 204) {
          setModalState(false);
          refreshCredentialList();
        }
      }).catch((error) => console.log(error));
  };

  return (
    <button
      className="flex flex-col justify-center"
      onClick={() => setModalState(true)}
    >
      <FaRegTrashAlt size={20} color="#fb7185" />
      <ModalWrapper
        modalState={modalState}
        modalTitle="Atualizar Credencial"
        setModalState={setModalState}
      >
        <p>
          Você deseja excluir as credenciais referentes ao funcionário <span className="italic font-semibold">{employee?.name}</span>?
        </p>
        <div className="w-full flex justify-center mt-3">
          <button
            className="bg-blood_red w-1/2 text-white rounded items-center"
            onMouseUp={async () => await deleteCredential(credential.employee_id)}
          >
            Excluir
          </button>
        </div>
      </ModalWrapper>
    </button>
  );
};

export default DeleteCredentialModal;
