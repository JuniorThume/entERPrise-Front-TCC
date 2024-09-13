import { Link } from 'react-router-dom';
import './index.css';

interface props {
  name: string;
  linkTo?: string;
}

const ItemMenu = ({ name, linkTo = "#" }: props) => {

  return (
    <Link to={linkTo}>
      <div className="hovered text-black border-transparent text-l m-4 hover:text-white">
        <p className="px-2 hover:ml-1 hover:border-l-2">{ name }</p>
      </div>
    </Link>
  );
}

export default ItemMenu;
