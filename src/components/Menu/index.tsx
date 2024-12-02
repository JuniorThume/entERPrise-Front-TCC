import ItemMenu from "./components/ItemMenu";
import "../../App.css";
import { useContext } from "react";
import AppContext from "../../context/appContext/AppContext";
import { Link } from "react-router-dom";
import { menuItems } from "../../consts/menuItems";
import { roles } from "../../consts/privilege";

const Menu = () => {
  const { setIsLogged, user } = useContext(AppContext);
  return (
    <div className="fixed top-0 flex flex-col h-[100vh] w-[20%] bg-[--menu-background] shadow-menu">
      <div className="text-white text-center p-8 font-bold">
        <Link to={'/'} type="button">
          <h1 className="text-2xl font-semibold">STAR MODAS</h1>
          <h6 className="text-[10px] font-normal">by entERPrise</h6>
        </Link>
      </div>
      <div className="flex flex-col justify-between h-100">
        <div>
          {Object.entries(menuItems).map((item, index) => {
            const privilege = roles[user.role as keyof typeof roles];
            if (privilege?.includes(item[1])) {
              return <ItemMenu key={index} name={item[0]} linkTo={item[1]} />
            }
          })}
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
