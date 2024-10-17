import { IoSearchOutline } from "react-icons/io5";
import { TbMinusVertical } from "react-icons/tb";
import { MdTune } from "react-icons/md";
import { useForm } from "react-hook-form";


const { control, register, handleSubmit } = useForm<>()

const onSubmit = (data) => {
  console.log(data);
}

const Search = () => {
  return (
    <div className="grid grid-cols-[3fr_1fr] justify-items-center w-full mt-[40px]">
      <form action="" onSubmit={handleSubmit()}>
        <div className="flex w-full justify-between items-center border border-black p-2 rounded-full">
          <div className="flex w-[100%]">
            <label htmlFor="searchProduct">
              <span>
                <TbMinusVertical size={24} />
              </span>
            </label>
            <input
              id="searchProduct"
              type="text"
              maxLength={150}
              {...register('search_product', { required: false })}
              className="text-right bg-white w-[100%] border border-transparent focus:outline-none"
            />
          </div>
          <button type="submit" className="hover:scale-[1.1]">
            <IoSearchOutline size={24} />
          </button>
        </div>
        <button type="button" className="flex w-1/2 bg-[#E1DAC0] justify-center items-center border border-transparent rounded-full p-2">
          <span>Filtrar</span>
          <MdTune className="ml-1" />
        </button>
      </form>
    </div>
  );
};

export default Search;
