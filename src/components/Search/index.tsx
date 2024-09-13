import { IoSearchOutline } from "react-icons/io5";
import { TbMinusVertical } from "react-icons/tb";
import { MdTune } from "react-icons/md";

const Search = () => {
  return (
    <div className="flex w-[60%] self-center justify-between mt-12">
      <div className="flex w-[80%] justify-between items-center border border-black p-2 rounded-full">
        <div className="flex w-[100%]">
          <label htmlFor="searchProduct">
            <span className="text-3l">
              <TbMinusVertical size={24} />
            </span>
          </label>
          <input
            id="searchProduct"
            type="text"
            maxLength={50}
            className="text-right bg-white w-[100%] border border-transparent focus:outline-none"
          />
        </div>
        <button type="submit" className="hover:scale-[1.1]">
          <IoSearchOutline size={24} />
        </button>
      </div>
      <button type="button" className="flex w-[100px] h-10 bg-[#E1DAC0] justify-between items-center border border-transparent rounded-full p-2">
        <button className="m-1" >
          Filtrar
        </button>
        <MdTune className="mr-1" />
      </button>
    </div>
  );
};

export default Search;
