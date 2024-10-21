import { Link } from "react-router-dom";
import icon from "./../../assets/sad-circle-svgrepo-com.svg";
import { TfiBackLeft } from "react-icons/tfi";
import { useAppContext } from "../../context/appContext/hook/useAppContext";

const NotFound = () => {
  const contextApp = useAppContext();
  return (
    <div className="w-full grid grid-rows-3 justify-center items-center">
      <div className="text-main text-center">
        <h1 className="font-bold text-[48px] text-center">NOT FOUND</h1>
        <div className="italic">
          <h2>Erro: Página não encontrada</h2>
          <p>Código do Erro: 404</p>
        </div>
      </div>
      <img className="justify-self-center" src={icon} alt="Icon 404 page" />
      <Link to={"/"} onClick={() => contextApp.setPath('')} type="button" className="justify-self-center flex items-center hover:underline">
        Voltar para a Home
        <TfiBackLeft />
      </Link>
    </div>
  );
};

export default NotFound;
