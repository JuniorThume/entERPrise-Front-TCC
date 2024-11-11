import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { API } from "../../../../api/axios";
import ModalWrapper from "../../../../components/ModalWrapper";
import { IEmployee } from "../../../../interfaces/IEmployee";
import { zodResolver } from "@hookform/resolvers/zod";
import { CredentialFormSchema } from "../../../../zodSchemas/credentials/schema";
import { CredentialFormData } from "../../../../zodSchemas/credentials/types";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { ICredential } from "../../../../interfaces/ICredential";

interface ICreateCredetnailsModal {
  modalState: boolean;
  modalTitle: string;
  setModalState: (state: boolean) => void;
  refreshCredentialsList: () => void;
}

const CreateCredentialModal = ({
  modalTitle,
  setModalState,
  modalState,
  refreshCredentialsList,
}: ICreateCredetnailsModal) => {
  const [employees, setEmployee] = useState<IEmployee[]>();
  const [credentials, setCredentials] = useState<ICredential[]>();
  const [employeeSelected, setEmployeeSelected] = useState<string>('');
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const [seeConfirmPassword, setSeeConfirmPassword] = useState<boolean>(false);
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
  } = useForm<CredentialFormData>({
    resolver: zodResolver(CredentialFormSchema),
  });

  const getEmployees = async () => {
    await API.get("/employees")
      .then((response) => response.data)
      .then((data) => setEmployee(data));
  };

  const getCredentials = async () => {
    await API.get("/credentials")
      .then((response) => response.data)
      .then((data) => setCredentials(data));
  };

  const onSubmit = async (data: CredentialFormData) => {
    await API.post(
      "/credentials",
      JSON.stringify({
        username: data.credential_username,
        password: data.credential_password,
        employee_id: data.credential_employee
      })
    )
      .then((response) => response.status)
      .then((status) => {
        if (status === 201) {
          setModalState(false);
          refreshCredentialsList();
        }
      });
  };

  useEffect(() => {
    if (!modalState) {
      reset();
      setEmployeeSelected('');
    } else {
      getCredentials();
      getEmployees();
    }
  }, [modalState, reset]);

  return (
    <ModalWrapper
      modalState={modalState}
      modalTitle={modalTitle}
      setModalState={setModalState}
    >
      <form
        action=""
        className="w-[450px] grid grid-rows-[3fr_auto] p-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-y-[10px]">
          <div className="flex flex-col">
            <label className="text-sm" htmlFor="employee_credential">
              Funcionário
            </label>
            <select
              id="employee_credential"
              {...register("credential_employee", { required: true })}
              className={`border bg-white p-1 focus:outline-none ${
                errors.credential_employee ? "border-red" : ""
                }`}
              onChange={(e) => setEmployeeSelected(e.target.innerText)}
            >
              { employeeSelected == '' && <option className="text-sm" value=''>Selecione um funcionário</option>}
              {modalState &&
                employees?.map((employee) => {
                  const credentials_ids = credentials?.map((credential) => credential.employee_id);
                  if (!credentials_ids?.includes(employee.id)) {
                    return <option key={employee.id} value={employee.id}>{employee.name}</option>
                  }
                }) 
              }
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm" htmlFor="username_credential">
              Nome de acesso(username)
            </label>
            <input
              {...register("credential_username", { required: true })}
              id="username_credential"
              className={`border p-1 focus:outline-none ${
                errors.credential_username ? "border-red" : ""
              } `}
              type="text"
              maxLength={150}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm" htmlFor="password_credential">
              Senha
            </label>
            <div className={`grid grid-cols-[1fr_auto] justify-center items-center border ${
                errors.credential_password ? "border-red" : ""
              } `}>
              <input
                {...register("credential_password", { required: true })}
                id="password_credential"
                className={`p-1 leading-normal border-none focus:outline-none`}
                type={seePassword ? 'text' : "password"}
                maxLength={150}
              />
              <button
                type="button"
                onMouseDown={() => setSeePassword(true)}
                onMouseUp={() => setSeePassword(false)}
                className="mr-2"
              >
                {seePassword ? <FaRegEye /> : <FaRegEyeSlash/>}
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-sm" htmlFor="confirm_password_credential">
              Confirmação da senha
            </label>
            <div
              className={`grid grid-cols-[1fr_auto] justify-center items-center border ${
                errors.credential_confirm_password ? "border-red" : ""
              } `}
            >
              <input
                {...register("credential_confirm_password", { required: true })}
                id="confirm_password_credential"
                className={`p-1 leading-normal border-none focus:outline-none`}
                type={seeConfirmPassword ? 'text' : "password"}
                maxLength={150}
              />
              <button
                type="button"
                onMouseDown={() => setSeeConfirmPassword(true)}
                onMouseUp={() => setSeeConfirmPassword(false)}
                className="mr-2"
              >
                {seeConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash/>}
              </button>

            </div>
          </div>
        </div>

        <div className="flex justify-center items-center mt-[30px]">
          <button
            type="submit"
            className="bg-dark_green rounded w-full text-white disabled:bg-gray"
            disabled={!isValid}
          >
            Adicionar
          </button>
        </div>
      </form>
      <div className="text-xs h-min-[20px]">
        {errors && Object.values(errors).map((error) => {
          return <p>{error.message}</p>;
        })}
      </div>
    </ModalWrapper>
  );
};

export default CreateCredentialModal;
