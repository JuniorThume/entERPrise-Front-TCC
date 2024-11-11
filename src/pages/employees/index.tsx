import { useEffect, useState } from "react";
import { API } from "../../api/axios";
import { IoAddCircleOutline } from "react-icons/io5";
import Credentials from "./credentials";
import { IEmployee } from "../../interfaces/IEmployee";
import CreateEmployeeModal from "./create";
import DeleteEmployeeModal from "./delete";
import UpdateEmployeeModal from "./update";

enum roles {
  'salesman' = "Vendedor",
  'admin' = "Administrador",
  'manager' = "Gerente",
}

const Employees = () => {
  const [employeesList, setEmployeesList] = useState<IEmployee[]>();
  const [refreshList, setRefreshList] = useState(false);
  const [createEmployeeModalState, setCreateEmployeeModalState] = useState<boolean>(false);
  const handleRefreshList = () => {
    setRefreshList(prev => !prev);
  }

  useEffect(() => {
    API.get("http://localhost:3000/api/v1/employees")
      .then((response) => response.data)
      .then((data: IEmployee[]) => {
        setEmployeesList(data)
      });
  }, [refreshList]);

  return (
    <div className="flex flex-col gap-y-[30px] font-[Montserrat]">
      <div className="flex flex-col gap-y-[10px]">
        <h2 className="text-2xl">Funcionarios</h2>
        <button
            onClick={() => setCreateEmployeeModalState(true)}
            type="button"
            className="flex justify-between rounded hover:scale-[1.06] transition items-center bg-main w-[120px] mt-[10px] font-medium p-1"
          >
            <p className="ml-1 text-white">Adicionar</p>
            <IoAddCircleOutline size={24} color="white" />
        </button>
        <CreateEmployeeModal modalState={createEmployeeModalState} modalTitle="Cadastrar Funcionário" setModalState={setCreateEmployeeModalState} refreshEmployeesList={handleRefreshList} />

        <div className="border rounded">
          <div className="grid grid-cols-5 border-b-[1px] p-1 italic font-semibold">
            <span>Cargo</span>
            <span>Nome</span>
            <span>Email</span>
            <span>Telefone</span>
            <span className="text-center">Ações</span>
          </div>

          {employeesList?.map((employee, index) => {
            const odd = index % 2 === 1;
            const personal_data = employee.personal_data;
            return (
              <div
                key={index}
                className={`grid grid-cols-5 py-2 indent-[5px] ${
                  odd ? "bg-light_gray" : "bg-white rounded"
                } `}
              >
                <div>{roles[employee?.role]}</div>
                <div>{employee?.name}</div>
                <div className={`${!personal_data && 'italic text-sm'} `}>{personal_data ? personal_data?.email : 'E-mail não cadastrado' }</div>
                <div
                  className={`${!personal_data?.phone && "italic text-sm"}  `}
                >
                  {personal_data?.phone ? personal_data.phone : "Não há contato"}
                </div>
                <div className="flex justify-center items-center gap-[20px]">
                  <UpdateEmployeeModal employee={employee} refreshEmployeesList={handleRefreshList} />
                  <DeleteEmployeeModal employee={employee} refreshEmployeesList={handleRefreshList} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Credentials />
    </div>
  );
};

export default Employees;