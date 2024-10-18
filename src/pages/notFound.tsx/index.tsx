import icon from './../../assets/sad-circle-svgrepo-com.svg';

const NotFound = () => {
  return (
    <div className="w-full grid grid-rows-3 justify-center items-center">
      <div className='text-main'>
        <h1 className='font-bold text-[48px] text-center'>NOT FOUND</h1>
        <div className='italic'>
          <h2>Erro: Página não encontrada</h2>
          <p>Código do Erro: 404</p>
        </div>
      </div>
      <img className='justify-self-center' src={icon} alt="Icon 404 page" />
    </div>
  );
}

export default NotFound;
