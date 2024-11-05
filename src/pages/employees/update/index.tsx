import { useEffect, useState } from "react";
import { API } from "../../../api/axios";
import ModalWrapper from "../../../components/ModalWrapper";
import { IEmployee } from "../../../interfaces/IEmployee";
import { MdOutlineModeEdit } from "react-icons/md";
import { useForm } from "react-hook-form";
import { updateEmployeeFormData } from "../../../zodSchemas/employees/update/types";
import { UpdateEmployeeFormSchema } from "../../../zodSchemas/employees/update/schema";
import { zodResolver } from "@hookform/resolvers/zod";

interface IUpdateEmployeeModal {
  refreshEmployeesList: () => void;
  employee: IEmployee;
}

const UpdateEmployeeModal = ({
  refreshEmployeesList,
  employee,
}: IUpdateEmployeeModal) => {
  const { handleSubmit, register, reset } = useForm<updateEmployeeFormData>({
    resolver: zodResolver(UpdateEmployeeFormSchema),
  });
  const [modalState, setModalState] = useState<boolean>(false);
  const onSubmit = async (data) => {
    console.log(data);
    // console.log(data);
    // await API.put(
    //   `/auth/credentials/${employee.id}`,
    //   JSON.stringify({
    //     username: data.username,
    //     old_password: data.old_password,
    //     new_password: data.new_password ? data.new_password : null,
    //   })
    // )
    //   .then((response) => response.status)
    //   .then((status) => {
    //     if (status === 204) {
    //       refreshEmployeesList();
    //     }
    //   });
  };

  useEffect(() => {
    if (!modalState) {
      reset();
    }
  }, [modalState, reset]);

  return (
    <button
      className="flex flex-col justify-center"
      onClick={() => setModalState(true)}
    >
      <MdOutlineModeEdit size={24} color="#60a5fa" />
      <ModalWrapper
        modalState={modalState}
        modalTitle="Atualizar Funcionário"
        setModalState={setModalState}
      >
        <p>
          Você deseja atualizar os dados referentes ao funcionário{" "}
          <span className="italic font-semibold">{employee.name}</span>?
        </p>
        <form
          name="update_employee"
          className="mt-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <fieldset className="border p-2">
            <legend>Funcionário</legend>
            <div className="grid grid-cols-2 gap-x-2">
              <div className="flex flex-col">
                <label className="text-sm" htmlFor="employee_name">
                  Nome:
                </label>
                <input
                  className="border pl-1"
                  type="text"
                  
                  id="employee_name"
                  defaultValue={employee.name}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm" htmlFor="employee_role">
                  Cargo:
                </label>
                <select
                  id="employee_role"
                  defaultValue={employee.role}
                  
                >
                  <option value="admin">Administrador</option>
                  <option value="manager">Gerente</option>
                  <option value="salesman">Vendedor</option>
                </select>
              </div>
            </div>
          </fieldset>
          <fieldset className="border p-2">
            <legend>Dados Pessoais</legend>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col">
                <label className="text-sm" htmlFor="user_email">
                  E-mail:
                </label>
                <input
                  className="border p-1"
                  type="email"
                  id="user_email"
                  defaultValue={employee.personal_data?.email}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm" htmlFor="user_cpf">
                  CPF:
                </label>
                <input
                  className="border p-1"
                  type="text"
                  maxLength={11}
                  id="user_cpf"
                  defaultValue={employee.personal_data?.cpf}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm" htmlFor="user_phone">
                  Telefone:
                </label>
                <input
                  className="border p-1"
                  type="tel"
                  maxLength={11}
                  id="user_phone"
                />
              </div>
            </div>
          </fieldset>
          <div className="w-full flex justify-center mt-3">
            <button
              type="submit"
              className="bg-blue_light w-1/2 text-white rounded items-center"
            >
              Atualizar
            </button>
          </div>
        </form>
      </ModalWrapper>
    </button>
  );
};

export default UpdateEmployeeModal;
