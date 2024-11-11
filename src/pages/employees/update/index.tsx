import { useEffect, useState } from "react";
import { API } from "../../../api/axios";
import ModalWrapper from "../../../components/ModalWrapper";
import { IEmployee } from "../../../interfaces/IEmployee";
import { MdOutlineModeEdit } from "react-icons/md";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useNotification } from "../../../context/notifyContext/hook/useNotification";
import { updateEmployeeFormData } from "./validation/types";
import { UpdateEmployeeFormSchema } from "./validation/schema";
interface IUpdateEmployeeModal {
  refreshEmployeesList: () => void;
  employee: IEmployee;
}

interface IFormData {
  employee: {
    employee_role: string;
    employee_name: string;
  };
  personal_data: {
    personal_data_email: string;
    personal_data_cpf: string;
    personal_data_phone: string;
  }
}

const UpdateEmployeeModal = ({
  refreshEmployeesList,
  employee,
}: IUpdateEmployeeModal) => {
  const notification = useNotification();
  const { handleSubmit, register, reset, formState: {errors} } = useForm<updateEmployeeFormData>({
    resolver: zodResolver(UpdateEmployeeFormSchema),
  });
  const [modalState, setModalState] = useState<boolean>(false);
  
  const onSubmit = async (data: IFormData) => {
    await API.put(
      `/employees/${employee.id}`,
      JSON.stringify({
        employee: {
          ...data.employee
        },
        personal_data: {
          ...data.personal_data
        }
      })
    )
      .then((response) => (response.status))
      .then((status) => {
        switch (status) {
          case 201:
            refreshEmployeesList();
            break;
          case 400:
            console.log("status 400")
            break;
          case 409: 
            console.log("status 409")
            break;
          default:
            console.log("status default")
            break;
        }
      }).catch((err: AxiosError) => {
        console.log(err);
        notification.notify(err.message);
      }).finally(() => {
        setModalState(false);
      })
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
                  className="border p-1 rounded focus:outline-none"
                  type="text"
                  {...register("employee.name")}
                  id="employee_name"
                  defaultValue={employee.name}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm" htmlFor="employee_role">
                  Cargo:
                </label>
                <select
                  // id="employee_role"
                  className="p-1 rounded focus:outline-none"
                  defaultValue={employee.role}
                  {...register("employee.role")}
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
                <label className="text-sm" htmlFor="personal_data_email">
                  E-mail:
                </label>
                <input
                  className="border p-1 rounded focus:outline-none"
                  type="email"
                  id="personal_data_email"
                  {...register("personal_data.email")}
                  defaultValue={employee.personal_data?.email || ''}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm" htmlFor="personal_data_cpf">
                  CPF:
                </label>
                <input
                  className="border p-1 rounded focus:outline-none"
                  type="text"
                  {...register("personal_data.cpf")}
                  maxLength={11}
                  id="personal_data_cpf"
                  defaultValue={employee.personal_data?.cpf || ''}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm" htmlFor="user_phone">
                  Telefone:
                </label>
                <input
                  className="border p-1 rounded focus:outline-none"
                  type="tel"
                  {...register("personal_data.phone")}
                  maxLength={11}
                  id="user_phone"
                  defaultValue={employee.personal_data?.phone || ''}
                />
              </div>
            </div>
          </fieldset>
          <div>
            {errors.personal_data?.phone && 
              <p>{ errors.personal_data?.phone.message }</p>
            }
          </div>
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
