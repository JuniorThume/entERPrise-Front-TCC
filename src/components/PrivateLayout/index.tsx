import Menu from '../Menu';
import Main from '../Main';
import { Outlet, } from 'react-router-dom';

const PrivateLayout = () => {

  return (
    <>
      <Menu />
      <Main>
        { <Outlet /> }
      </Main>
    </>
  );
}

export default PrivateLayout;
