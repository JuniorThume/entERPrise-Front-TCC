import { useState } from "react";


interface IProps {
  onClick: () => void;
}

const CreateDetails = ({ onClick }: IProps) => {

  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  
  const DiscartHandleClick = () => {
    if (!size && !color && !quantity && !price) {
      onClick()
    }
    setSize('');
    setColor('');
    setQuantity(0);
    setPrice(0);
  }

  return (
    <div className='w-full border-b mb-5 border-black'>
      <form action={'#'} className='grid grid-cols-5 justify-between content-center p-4'>
        <div className="flex flex-col items-center">
          <label className="mb-1 text-sm" htmlFor="input_size">Tamanho</label>
          <input className='bg-white  text-center border p-1 rounded-md border-black text-sm w-[50%]' onChange={(e) => setSize(e.currentTarget.value)} value={size} maxLength={4} type="text" name="" id="input_size" />
        </div>
        <div className="flex flex-col items-center">
          <label className="mb-1 text-sm" htmlFor="input_color">Cor</label>
          <input className='bg-white border w-[70%] p-1 rounded-md border-black text-center text-sm' minLength={4} onChange={(e) => setColor(e.currentTarget.value)} value={color} maxLength={15} type="text" name="" id="input_color" />
        </div>
        <div className="flex flex-col items-center ">
          <label className="mb-1 text-sm" htmlFor="input_quantity">Quantidade</label>
          <input className='bg-white w-[50%] text-center p-1 border rounded-md border-black text-sm' onChange={(e) => setQuantity(parseInt(e.currentTarget.value))} value={quantity} max={9999} min={1} type="number" defaultValue={1} name="" id="input_quantity" />
        </div>
        <div className="flex flex-col items-center ">
          <label className="mb-1 text-sm" htmlFor="input_price">Preço</label>
          <div className=' flex items-center justify-between bg-white border rounded-md border-black p-1 w-[70%]'>
            <span className="text-sm font-semibold pr-1 border-r border-black">R$</span>
            <input className='bg-white outline-none w-[80%] text-center text-sm' type="number" onChange={(e) => setPrice(parseFloat(e.currentTarget.value))} value={price} step={0.1} name="" id="input_price" />
          </div>
        </div>
        <div className="flex justify-center self-end text-sm ">
          <button type="button" disabled className="bg-main-green text-white p-2 m-1 rounded-md hover:outline hover:outline-1 hover:outline-dark_green">Adicionar</button>
          <button type="button" onClick={() => DiscartHandleClick()} className="bg-remove text-white hover:scale-[1.1] rounded-md p-2 m-1">Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default CreateDetails;
