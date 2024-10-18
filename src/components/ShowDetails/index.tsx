import ShowDetailsItem from "./ShowDetailsItem";

const ShowDetails = () => {
  const details = [
    { size: 's', color: 'dsda', quantity: 10, price: 10 },
    { size: 'm', color: 'dsda', quantity: 10, price: 10 },
    { size: 's', color: 'dsda', quantity: 10, price: 10 },
    { size: 'm', color: 'dsda', quantity: 10, price: 10 },
  ]
  
  return (
    <div className="grid my-6 justify-items-center ">
      <span className="text-sm place-content-end pb-1">Existem { details.length } opções cadastradas.</span>
      <div className="grid grid-cols-4 w-2/3 justify-items-center justify-center content-center border p-2">
        <h3>Tamanho</h3>
        <h3>Cor</h3>
        <h3>Quantidade</h3>
        <h3>Preço</h3>
      </div>
      {
        details.map((_, i) => {
          return <ShowDetailsItem details={_} index={i}/>
        })
      }
    </div>
  );
}

export default ShowDetails;
