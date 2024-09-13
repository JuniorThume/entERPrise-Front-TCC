import { ReactElement } from "react";


interface IMainProps {
  children: ReactElement;
}

const Main = ({children}: IMainProps) => {
  return (
    <div className='w-[80%] ml-[20%] pt-[40px] pl-[80px] pr-[80px] flex-grow text-black'>
      { children }
    </div>
  );
}

export default Main;
