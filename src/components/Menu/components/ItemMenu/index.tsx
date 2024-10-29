import { Link } from "react-router-dom";
import { useAppContext } from "../../../../context/appContext/hook/useAppContext";

interface props {
  name: string;
  linkTo?: string;
}
const ItemMenu = ({ name, linkTo = "#" }: props) => {
  const contextApp = useAppContext();
  const pathSelect = location.pathname.split('/')[1];

  return (
    <Link to={`/${linkTo}`} onClick={() => contextApp.setPath(linkTo)}>
      <div className="text-black border-transparent text-lg m-4 ">
        <p
          className={`transition-[0.01] px-2 hover:ml-1 hover:border-l-2 hover:text-white ${
            linkTo == pathSelect && "border-l-2 text-white ml-1"
          }`}
        >
          {name}
        </p>
      </div>
    </Link>
  );
};

export default ItemMenu;
