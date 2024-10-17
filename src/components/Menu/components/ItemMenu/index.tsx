import { Link } from 'react-router-dom';
import './index.css';
import { useEffect, useState } from 'react';

interface props {
  name: string;
  linkTo?: string;
  
}

const ItemMenu = ({ name, linkTo = "#" }: props) => {
  const [isSelect, setIsSelect] = useState(false);
  const ifIsSelected  = () => {
    const primaryResourcePath = window.location.pathname.split('/')[1];
    
    if (linkTo === primaryResourcePath) {
      setIsSelect(true);
    }
  }

  useEffect(() => {
    ifIsSelected();
  })
  return (
    <Link to={`/${linkTo}`} onClick={() => ifIsSelected()}>
      <div className="text-black border-transparent text-lg m-4 ">
        <p className={`hovered px-2 hover:ml-1 hover:border-l-2 hover:text-white ${isSelect && "border-l-2 text-white ml-1"}`}>{ name }</p>
      </div>
    </Link>
  );
}

export default ItemMenu;
