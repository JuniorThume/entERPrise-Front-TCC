import { useEffect, useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { ICredential } from "../../../../interfaces/ICredential";
// import { API } from "../../../../api/axios";
import ModalWrapper from "../../../../components/ModalWrapper";
import { IEmployee } from "../../../../interfaces/IEmployee";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateCredentialFormData } from "./validation/types";
import { UpdateCredentialFormSchema } from "./validation/schema";

interface IUpdateCredentialModal {
  refreshCredentialList: () => void;
  credential: ICredential;
  employee: IEmployee;
}

const UpdateCredentialModal = ({
  refreshCredentialList,
  credential,
  employee,
}: IUpdateCredentialModal) => {
  const [modalState, setModalState] = useState<boolean>(false);
  const [hasOldPassword, setHasOldPassword] = useState<boolean>(false);
  const [alterPassword, setAlterPassword] = useState<boolean>(false);

  const [seeOldPassword, setSeeOldPassword] = useState<boolean>(false);
  const [seeNewPassword, setSeeNewPassword] = useState<boolean>(false);
  const [seeConfirmationNewPassword, setSeeConfirmationNewPassword] =
    useState<boolean>(false);
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
    setValue,
  } = useForm<UpdateCredentialFormData>({
    resolver: zodResolver(UpdateCredentialFormSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    alert("tentativa de alterar credencial");
  };

  useEffect(() => {
    if (!modalState) {
      reset();
    } else {
      if (!hasOldPassword) {
        setValue("update_credential_new_password", "");
        setValue("update_credential_confirm_new_password", "");
      }
    }
  }, [modalState, hasOldPassword, reset, setValue]);

  return (
    <button
      className="flex flex-col justify-center"
      onClick={() => setModalState(true)}
    >
      <MdOutlineModeEdit size={24} color="#60a5fa" />
      <ModalWrapper
        modalState={modalState}
        modalTitle="Atualizar Credencial"
        setModalState={setModalState}
      >
        <p>
          Você deseja atualizar as credenciais referentes ao funcionário{" "}
          <span className="italic font-semibold">{employee?.name}</span>?
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-3 mt-3"
        >
          <fieldset className="border p-1">
            <legend className="text-sm">Proprietário da credencial</legend>
            <div className="grid grid-cols-2 gap-x-2">
              <div className="flex flex-col">
                <label className="text-sm" htmlFor="employee_name">
                  Nome:
                </label>
                <input
                  className="border pl-1"
                  type="text"
                  name=""
                  id="employee_name"
                  disabled
                  defaultValue={employee?.name}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm" htmlFor="employee_role">
                  Cargo:
                </label>
                <select
                  name=""
                  id="employee_role"
                  defaultValue={employee?.role}
                  disabled
                >
                  <option value="manager">Gerente</option>
                  <option value="salesman">Vendedor</option>
                </select>
              </div>
            </div>
          </fieldset>
          <fieldset className="border p-1">
            <legend className="text-sm">Credencial</legend>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col">
                <label className="text-sm" htmlFor="username">
                  Nome do usuário:
                </label>
                <input
                  className="border p-1 focus:outline-none"
                  type="text"
                  {...register("update_credential_username", {
                    required: true,
                  })}
                  id="username"
                  defaultValue={credential?.username}
                />
              </div>
              <div className="flex flex-col" aria-disabled={true}>
                <label className="text-sm" htmlFor="actual_password">
                  Senha atual:
                </label>
                <div
                  className={`grid grid-cols-[1fr_auto] justify-center items-center border`}
                >
                  <input
                    id="actual_password"
                    className={`p-1 leading-normal border-none focus:outline-none`}
                    {...register("update_credential_old_password", {
                      required: true,
                    })}
                    onChange={(e) => {
                      setHasOldPassword(e.currentTarget.value !== "");
                    }}
                    type={seeOldPassword ? "text" : "password"}
                    maxLength={150}
                  />
                  <button
                    type="button"
                    onMouseDown={() => {
                      setSeeOldPassword(true);
                    }}
                    onMouseUp={() => {
                      setSeeOldPassword(false);
                    }}
                    className="mr-2"
                  >
                    {seeOldPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </button>
                </div>
              </div>
              <div className="col-span-2 flex items-center gap-x-3">
                <label className="">Alterar senha:</label>
                <input
                  defaultChecked={alterPassword}
                  {...register("alter_password")}
                  onChange={(e) => setAlterPassword(e.currentTarget.checked)}
                  className="h-6 w-6 accent-white border-gray-300 rounded"
                  type="checkbox"
                />
              </div>
              <div
                className={`${!alterPassword && "hidden"} flex flex-col ${
                  !hasOldPassword && "text-gray"
                }`}
              >
                <label className="text-sm" htmlFor="new_password">
                  Nova senha
                </label>
                <div
                  className={`grid grid-cols-[1fr_auto] justify-center items-center border`}
                >
                  <input
                    disabled={!hasOldPassword}
                    id="new_password"
                    className={`p-1 leading-normal border-none focus:outline-none`}
                    {...register("update_credential_new_password", {
                      required: false,
                    })}
                    type={seeNewPassword ? "text" : "password"}
                    maxLength={150}
                  />
                  <button
                    type="button"
                    onMouseDown={() => {
                      setSeeNewPassword(true);
                    }}
                    onMouseUp={() => {
                      setSeeNewPassword(false);
                    }}
                    className="mr-2"
                  >
                    {seeNewPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </button>
                </div>
              </div>
              <div
                className={`${!alterPassword && "hidden"} flex flex-col ${!hasOldPassword && "text-gray"} `}
              >
                <label className="text-sm" htmlFor="confirm_new_password">
                  Confirmação da nova senha
                </label>
                <div
                  className={`grid grid-cols-[1fr_auto] justify-center items-center border`}
                >
                  <input
                    disabled={!hasOldPassword}
                    id="confirm_new_password"
                    className={`p-1 leading-normal border-none focus:outline-none`}
                    {...register("update_credential_confirm_new_password", {
                      required: false,
                    })}
                    type={seeConfirmationNewPassword ? "text" : "password"}
                    maxLength={150}
                  />
                  <button
                    type="button"
                    onMouseDown={() => {
                      setSeeConfirmationNewPassword(true);
                    }}
                    onMouseUp={() => {
                      setSeeConfirmationNewPassword(false);
                    }}
                    className="mr-2"
                  >
                    {seeConfirmationNewPassword ? (
                      <FaRegEye />
                    ) : (
                      <FaRegEyeSlash />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </fieldset>
          <div>
            {errors.update_credential_new_password && (
              <div>{errors.update_credential_new_password.message}</div>
            )}
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

export default UpdateCredentialModal;
