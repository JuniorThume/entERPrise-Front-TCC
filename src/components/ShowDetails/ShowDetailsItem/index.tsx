interface IProps {
  index: number;
  details: {
    size: string;
    color: string;
    quantity: number;
    price: number;
  }
}

const ShowDetailsItem = ({ index, details }: IProps) => {
  const bg = index % 2 === 0 ? 'bg-light_gray' : 'bg-white';
  return (
    <div key={index} className={`grid grid-cols-4 w-2/3 justify-items-center content-center p-2 ${bg}`}>
      <span>{ details.size }</span>
      <span>{ details.color }</span>
      <span>{ details.quantity }</span>
      <span>{ details.price }</span>
    </div>
  );
}

export default ShowDetailsItem;
