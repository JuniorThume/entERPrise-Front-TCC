import { ReactNode } from 'react';
import Menu from '../Menu';
import Main from '../Main';

interface ILayoutPrivateProps {
  children: ReactNode;
}

const PrivateLayout = ({ children }: ILayoutPrivateProps) => {
  return (
    <>
      <Menu />
      <Main>
        { children }
      </Main>
    </>
  );
}

export default PrivateLayout;
