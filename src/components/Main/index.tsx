import { ReactElement } from "react";


interface IMainProps {
  children: ReactElement;
}

const Main = ({children}: IMainProps) => {
  return (
    <div className='w-[80%] ml-[20%] pt-[40px] pl-[40px] pr-[40px] flex-grow text-black'>
      { children }
    </div>
  );
}

export default Main;
