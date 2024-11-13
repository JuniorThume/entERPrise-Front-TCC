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
  role?: string;
  name?: string;
  email?: string | undefined;
  cpf?: string | undefined;
  phone?: string | undefined;
  
}
const UpdateEmployeeModal = ({
  refreshEmployeesList,
  employee,
}: IUpdateEmployeeModal) => {
  const notification = useNotification();
  // const [employee, setEmployee] = useState<IEmployee>(employee_clicked);
  // console.log(employee)
  
  const { handleSubmit, register, reset, formState: {errors, isValid} } = useForm<updateEmployeeFormData>({
    resolver: zodResolver(UpdateEmployeeFormSchema),
    reValidateMode: 'onBlur',
    resetOptions: {
      keepIsSubmitSuccessful: false
    },
  });
  const [modalState, setModalState] = useState<boolean>(false);
  
  const onSubmit = async (data: IFormData) => {

    await API.put(
      `/employees/${employee.id}`,
      JSON.stringify({
        ...data
      })
    )
      .then((response) => {
        console.log(response.data)
        return response.status
      })
      .then((status) => {
        console.log(status);
        if(status === 201) {
          refreshEmployeesList();
        }
      }).catch((error: AxiosError) => {
        const response = error.response?.data as { message: string };
        notification.notify(response.message);
      }).finally(() => {
        setModalState(false);
      })
  };

  useEffect(() => {
    const defaultEmployeeValues = {
      cpf: employee?.personal_data?.cpf || undefined,
      email: employee?.personal_data?.email || undefined,
      phone: employee?.personal_data?.phone || undefined,
      role: employee?.role,
      name: employee?.name,
    }
    if (modalState && employee) {
      reset(defaultEmployeeValues);
    }

  }, [modalState, reset, employee]);

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
          Você deseja atualizar os dados referentes ao funcionário 
          <span className="italic font-semibold"> {employee?.name}</span>?
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
                  {...register("name")}
                  id="employee_name"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm" htmlFor="employee_role">
                  Cargo:
                </label>
                <select
                  id="employee_role"
                  className="p-1 rounded focus:outline-none"
                  {...register("role")}
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
                  {...register("email")}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm" htmlFor="personal_data_cpf">
                  CPF:
                </label>
                <input
                  className="border p-1 rounded focus:outline-none"
                  type="text"
                  {...register("cpf")}
                  maxLength={11}
                  id="personal_data_cpf"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm" htmlFor="user_phone">
                  Telefone:
                </label>
                <input
                  className={`border p-1 rounded focus:outline-none`}
                  type="tel"
                  {...register("phone")}
                  maxLength={11}
                  id="user_phone"
                />
              </div>
            </div>
          </fieldset>
          <div
            id="show_input_errors"
            className="flex flex-col text-red text-xs mt-[4px]"
          >
            {errors &&
              Object.values(errors).map((error) => {
                console.log('aqui');
                return <span className="w-[90%] text-wrap">{error?.message}</span>;
              })}
          </div>
          <div className="w-full flex justify-center mt-3">
            <button
              type="submit"
              disabled={!isValid}
              className="bg-blue_light w-1/2 text-white rounded items-center disabled:bg-gray"
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
