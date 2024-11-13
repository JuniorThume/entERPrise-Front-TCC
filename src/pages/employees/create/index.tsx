import { useForm } from "react-hook-form";
import ModalWrapper from "../../../components/ModalWrapper";
import { useEffect, useState } from "react";
import { API } from "../../../api/axios";
import { EmployeeFormData } from "../../../zodSchemas/employees/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmployeeFormSchema } from "../../../zodSchemas/employees/schema";
import { AxiosError } from "axios";
import { useNotification } from "../../../context/notifyContext/hook/useNotification";

interface ICreateEmployeeModal {
  modalState: boolean;
  modalTitle: string;
  setModalState: (state: boolean) => void;
  refreshEmployeesList: () => void;
}

const CreateEmployeeModal = ({
  modalTitle,
  setModalState,
  modalState,
  refreshEmployeesList
}: ICreateEmployeeModal) => {
  const notification = useNotification();
  const { register, handleSubmit, formState: { isValid, errors }, reset } = useForm<EmployeeFormData>({
    resolver: zodResolver(EmployeeFormSchema)
  });
  const [employeeRole, setEmployeeRole] = useState<string>("");

  const onSubmit = async (data: EmployeeFormData) => {
    await API.post(
      "/employees",
      JSON.stringify({
        role: data.employee_role,
        name: data.employee_name,
      })
    )
      .then(response => response.status)
      .then(status => {
        if (status === 201) {
          refreshEmployeesList()
        }
      }).catch((err: AxiosError) => {
        if (err.response?.status === 409) {
          notification.notify("Já existe um funcionário com este nome")
        }
      }).finally(() => {
        setModalState(false);
      })
      ;
  };

  useEffect(() => {
    if (!modalState) {
      reset();
    }
  }, [setEmployeeRole, modalState, reset]);

  return (
    <ModalWrapper
      modalState={modalState}
      modalTitle={modalTitle}
      setModalState={setModalState}
    >
      <form
        action=""
        className="w-[400px] grid grid-rows-[2fr_1fr] p-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full">
          <div className="flex flex-col">
            <label htmlFor="role_employee">Cargo</label>
            <select
              id="role_employee"
              {...register("employee_role", { required: true })}
              className="border bg-white p-1"
            >
              {employeeRole == "" && <option value="">Selecione</option>}
              <option value="manager">Gerente</option>
              <option value="salesman">Vendedor</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="name_employee">Nome</label>
            <input
              {...register("employee_name", { required: true })}
              id="name_employee"
              className="border p-1"
              type="text"
              maxLength={150}
            />
          </div>
        </div>

        <div className="flex justify-center items-center">
          <button
            type="submit"
            className={`bg-dark_green rounded w-full text-white disabled:bg-gray`}
            disabled={!isValid}
          >
            Adicionar
          </button>
        </div>
      </form>
      <div className="text-xs h-min-[20px]">
        {Object.values(errors).map((error) => {
          return <p className="text-black">{ error?.message }</p>;
        })}
      </div>
    </ModalWrapper>
  );
};

export default CreateEmployeeModal;
