import ItemMenu from "./components/ItemMenu";
import "../../App.css";
import { MdSupportAgent } from "react-icons/md";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="fixed top-0 flex flex-col h-[100vh] w-[20%] bg-[--menu-background] shadow-menu">
      <div className="text-white text-center p-8 font-bold">
        <Link to={'/'}>
          <h1 className="text-2xl font-semibold">STAR MODAS</h1>
          <h6 className="text-[10px] font-normal">by entERPrise</h6>
        </Link>
      </div>
      <div className="flex flex-col justify-between h-100">
        <div className="">
          <ItemMenu name="Produtos" linkTo="/products"/>
          <ItemMenu name="Clientes" />
          <ItemMenu name="Vendas" />
          <ItemMenu name="Funcionários" />
          <ItemMenu name="Fornecedores" />
          <ItemMenu name="Compras" />
        </div>
        {/* <div className="text-black text-center hover:text-light_gray">
          <a href="#" className="flex items-center justify-center">
            <MdSupportAgent />
            <p className="ml-2">Contate o suporte</p>
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default Menu;
