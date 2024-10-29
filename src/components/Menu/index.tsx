import ItemMenu from "./components/ItemMenu";
import "../../App.css";
import { useContext } from "react";
import AppContext from "../../context/appContext/AppContext";
import { Link } from "react-router-dom";

const Menu = () => {
  const { setIsLogged } = useContext(AppContext);
  return (
    <div className="fixed top-0 flex flex-col h-[100vh] w-[20%] bg-[--menu-background] shadow-menu">
      <div className="text-white text-center p-8 font-bold">
        <Link to={'/'} type="button">
          <h1 className="text-2xl font-semibold">STAR MODAS</h1>
          <h6 className="text-[10px] font-normal">by entERPrise</h6>
        </Link>
      </div>
      <div className="flex flex-col justify-between h-100">
        <div className="">
          <ItemMenu name="Produtos" linkTo="products" />
          <ItemMenu name="Clientes" linkTo="customers" />
          <ItemMenu name="Vendas" linkTo="salles" />
          <ItemMenu name="Funcionários" linkTo="employees" />
          <ItemMenu name="Fornecedores" linkTo="suppliers" />
          <ItemMenu name="Compras" linkTo="purchases" />
        </div>
      </div>
      <div className="text-black text-center hover:text-light_gray self-center">
        <button
          type="button"
          className="bg-white w-[75px] mb-1 text-main shadow-md hover:scale-[1.07] transition"
          onClick={() => setIsLogged(false)}
        >
          <p className="">Sair</p>
        </button>
      </div>
    </div>
  );
};

export default Menu;
