import { useState } from "react";
import { ICredential } from "../../../../interfaces/ICredential";
import { API, refreshTokenRequest } from "../../../../api/axios";
import ModalWrapper from "../../../../components/ModalWrapper";
import { IEmployee } from "../../../../interfaces/IEmployee";
import { FaRegTrashAlt } from "react-icons/fa";
import { AxiosError } from "axios";
import { useAppContext } from "../../../../context/appContext/hook/useAppContext";

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
  const contextApp = useAppContext();
  const deleteCredential = async (id: number) => {
    console.log(credential)
    await API.delete(`/employees/credentials/${id}`)
      .then((response) => response.status)
      .then((status) => {
        if (status === 204) {
          setModalState(false);
          refreshCredentialList();
        }
      }).catch((error: AxiosError) => {
        if (error.status === 401) {
          refreshTokenRequest(contextApp.setToken);
        }
      });
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
            onMouseUp={async () => await deleteCredential(credential.employee.id)}
          >
            Excluir
          </button>
        </div>
      </ModalWrapper>
    </button>
  );
};

export default DeleteCredentialModal;
