import { useState } from "react";
import { API } from "../../../api/axios";
import ModalWrapper from "../../../components/ModalWrapper";
import { IEmployee } from "../../../interfaces/IEmployee";
import { FaRegTrashAlt } from "react-icons/fa";
import { AxiosError } from "axios";
import { useNotification } from "../../../context/notifyContext/hook/useNotification";

interface IDeleteEmployeeModal {
  refreshEmployeesList: () => void;
  employee: IEmployee;
}

const DeleteEmployeeModal = ({
  refreshEmployeesList,
  employee,
}: IDeleteEmployeeModal) => {
  const notification = useNotification();
  const [modalState, setModalState] = useState<boolean>(false);
  const deleteEmployee = async (id: number) => {
    await API.delete(`/employees/${id}`)
      .then((response) => response.status)
      .then((status) => {
        if (status === 204) {
          refreshEmployeesList();
        }
      })
      .catch((error: AxiosError) => {
        notification.notify(error.message);
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
        modalTitle="Excluir Funcionário"
        setModalState={setModalState}
      >
        <p>
          Você realmente deseja remover <span className="italic font-semibold">{employee.name}</span> dos seus funcionários?
        </p>
        <div className="w-full flex justify-center mt-3">
          <button
            className="bg-blood_red w-1/2 text-white rounded items-center"
            onClick={() => deleteEmployee(employee.id)}
          >
            Excluir
          </button>
        </div>
      </ModalWrapper>
    </button>
  );
};

export default DeleteEmployeeModal;
