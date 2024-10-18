import { IoSearchOutline } from "react-icons/io5";
import { TbMinusVertical } from "react-icons/tb";
import { useForm } from "react-hook-form";
import ModalWrapper from "../ModalWrapper";
import { useState } from "react";
import { BiFilterAlt } from "react-icons/bi";

const onSubmit = (data) => {
  alert(JSON.stringify(data));
};

const Search = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [filterModalState, setFilterModalState] = useState(false);

  const clearInputs = () => {
    setValue('category_filter', '');
    setValue('brand_filter', '');
    setValue('material_filter', '');
    setValue('genre_filter', '');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-[3fr_1fr] self-center w-[80%] mt-[40px]"
    >
      <div className="flex w-full justify-center items-center border border-black p-1 rounded-full">
        <div className="flex items-center w-[100%]">
          <span>
            <TbMinusVertical size={24} />
          </span>
          <input
            id="searchProduct"
            type="search"
            maxLength={150}
            {...register("search_product", { required: false })}
            className="text-right bg-white w-[100%] focus:border-transparent focus:ring-transparent border border-transparent p-0"
          />
        </div>
        <button type="submit" className="hover:scale-[1.1]">
          <IoSearchOutline size={24} />
        </button>
      </div>
      <button
        type="button"
        onClick={() => setFilterModalState(true)}
        className="flex justify-center bg-main text-white items-center justify-self-center self-end h-[50px] w-[60%] border border-transparent rounded-full p-2"
      >
        <div className="flex items-center gap-x-[10px]">
          <BiFilterAlt />
          <span>Filtrar</span>
        </div>
        <ModalWrapper
          modalTitle="Filtros"
          modalState={filterModalState}
          setModalState={setFilterModalState}
        >
          <div className="flex flex-col gap-y-3">
            <div className="grid items-center ">
              <label htmlFor="category_filter" className="mr-2">
                Categoria:
              </label>
              <input
                {...register('category_filter')}
                type="text"
                id="category_filter"
                className="border focus:ring-none focus:outline-none p-1 bg-white"
              />
            </div>
            <div className="grid items-center">
              <label htmlFor="brand_filter" className="mr-2">
                Marca:
              </label>
              <input
                {...register('brand_filter')}
                type="text"
                id="brand_filter"
                className="border focus:ring-none focus:outline-none p-1 bg-white"
              />
            </div>
            <div className="grid items-center">
              <label htmlFor="material_filter" className="mr-2">
                Material:
              </label>
              <input
                {...register('material_filter')}
                type="text"
                id="material_filter"
                className="border focus:ring-none focus:outline-none p-1 bg-white"
                
              />
            </div>
            <div className="grid items-center">
              <label htmlFor="genre_filter" className="mr-2">
                Gênero:
              </label>
              <select
                {...register('genre_filter')}
                id="genre_filter"
                className="bg-white border p-1 "
              >
                <option defaultChecked value="">
                  Todos
                </option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Infantil">Infantil</option>
              </select>
            </div>
            <button
              type="reset"
              className="bg-blood_red text-white"
              onClick={() => clearInputs()}
            >
              Limpar
            </button>
          </div>
        </ModalWrapper>
      </button>
    </form>
  );
};

export default Search;
