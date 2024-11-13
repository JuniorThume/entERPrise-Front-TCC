import { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { ICredential } from "../../../interfaces/ICredential";
import { API } from "../../../api/axios";
import { ISOtoBrFormat } from "../../../utils/ISOToBrFormat";
import CreateCredentialModal from "./create";
import UpdateCredentialModal from "./update";
import DeleteCredentialModal from "./delete";




const Credentials = () => {
  const [creadentialList, setCredentialList] = useState<ICredential[]>();
  const [refreshList, setRefreshList] = useState(false);
  const [createCredentialModalState, setCreateCredentialModalState] = useState<boolean>(false);
  const handleRefreshCredential = () => {
    setRefreshList(prev => !prev);
  }

  useEffect(() => {
    API.get("http://localhost:3000/api/v1/credentials")
      .then((response) => response.data)
      .then((data: ICredential[]) => {
        setCredentialList(data);
      });
  }, [refreshList]);
  return (
    <div className="flex flex-col gap-y-[30px] font-[Montserrat]">
      <div className="flex flex-col gap-y-[10px]">
        <h2 className="text-2xl">Credenciais</h2>

        <button
          onClick={() => setCreateCredentialModalState(true)}
          type="button"
          className="flex justify-between rounded hover:scale-[1.06] transition items-center bg-main w-[120px] mt-[10px] font-medium p-1"
        >
          <p className="ml-1 text-white">Adicionar</p>
          <IoAddCircleOutline size={24} color="white" />
        </button>
        <CreateCredentialModal modalState={createCredentialModalState} modalTitle="Criar Credenciais" refreshCredentialsList={handleRefreshCredential} setModalState={setCreateCredentialModalState} />

        <div className="border rounded">
          <div className="grid grid-cols-4 border-b-[1px] p-1 italic font-semibold">
            <span>Nome do funcionário</span>
            <span>Nome de acesso</span>
            <span>Criado em</span>
            <span className="text-center">Ações</span>
          </div>

          {creadentialList?.map((credential, index) => {
            const odd = index % 2 === 1;
            const employee = credential?.employee;
            
            return (
              <div
                key={index}
                className={`grid grid-cols-4 py-2 indent-[5px] ${
                  odd ? "bg-light_gray" : "bg-white rounded"
                } `}
              >
                <div className="overflow-hidden">{employee?.name}</div>
                <div className="overflow-hidden">{credential?.username}</div>
                <div className="overflow-hidden">{ISOtoBrFormat(new Date(credential?.created_at))}</div>

                <div className="flex justify-center items-center gap-[20px]">
                  <UpdateCredentialModal refreshCredentialList={handleRefreshCredential} credential={credential} employee={employee}/>
                  <DeleteCredentialModal refreshCredentialList={handleRefreshCredential} credential={credential} employee={employee}/>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Credentials;
