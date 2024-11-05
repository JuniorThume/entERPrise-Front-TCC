import { IoSearchOutline } from "react-icons/io5";
import { TbMinusVertical } from "react-icons/tb";
import { useForm } from "react-hook-form";
import ModalWrapper from "../ModalWrapper";
import { useEffect, useState } from "react";
import { BiFilterAlt } from "react-icons/bi";
import { useSearch } from "../../context/searchContext/hook/useSearch";
import { useNavigate } from "react-router-dom";

interface FilterProps {
  category: string;
  name: string;
  material: string;
  brand: string;
  genre: string;
  page: string;
  limit: string;
}

type Filters = {
  [key: string]: string | null;
};

interface ISearchProps {
  refreshFunc: () => void;
}

const Search = ({refreshFunc}: ISearchProps) => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const [filterModalState, setFilterModalState] = useState(false);
  const contextSearch = useSearch();
  const [filters, setFilters] = useState<Filters>({});
  const searchParams = contextSearch.query;
  const onSubmit = () => {
    searchParams.delete('page');
    contextSearch.setPage(1);
    contextSearch.setQuery(searchParams);
    refreshFunc();  
  };

  const handleFilterChange = (key: keyof FilterProps, value: string) => {
    setValue(key as string, value);
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    handleFilterChange("brand", "");
    handleFilterChange("material", "");
    handleFilterChange("genre", "");
    handleFilterChange("category", "");
  };
  useEffect(() => {
    const handleURLFilters = (filters: Filters, searchParams: URLSearchParams) => {
      Object.keys(filters).forEach((key) => {
        const value = filters[key];
        if (value !== "" && value !== null) {
          searchParams.set(key, value);
        } else {
          searchParams.delete(key);
        }
      });
      contextSearch.setQuery(searchParams);
    };
    handleURLFilters(filters, searchParams);
  }, [filters, navigate, contextSearch, searchParams]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-[3fr_1fr] self-center w-[80%] mt-[40px] h-[50px]"
    >
      <div className="grid grid-cols-[1fr_auto] gap-x-[10px] w-full justify-center items-center border border-black p-1 rounded-full">
        <div className="flex items-center w-[100%]">
          <span>
            <TbMinusVertical size={24} />
          </span>
          <input
            id="searchProduct"
            type="search"
            maxLength={150}
            {...register("name", { required: false })}
            onChange={(e) => handleFilterChange("name", e.target.value)}
            defaultValue={""}
            className="text-right w-full bg-white border-none focus:outline-none p-0"
          />
        </div>
        <button type="submit"
          className="bg-main h-full rounded-full text-white justify-center items-center px-[20px]">
          <div className="hover:scale-[1.1] flex gap-x-[10px] transition">
            <IoSearchOutline size={24} />
            Buscar
          </div>
        </button>
      </div>
      <button
        type="button"
        onClick={() => setFilterModalState(true)}
        className="flex justify-center self-center h-2/3 bg-main text-white items-center justify-self-center self-end w-[60%] border border-transparent rounded hover:scale-[1.05] transition"
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
                {...register("category")}
                type="text"
                id="category_filter"
                onChange={(e) => handleFilterChange("category", e.target.value)}
                className="border focus:ring-none focus:outline-none p-1 bg-white"
              />
            </div>
            <div className="grid items-center">
              <label htmlFor="brand_filter" className="mr-2">
                Marca:
              </label>
              <input
                {...register("brand")}
                type="text"
                id="brand_filter"
                onChange={(e) => handleFilterChange("brand", e.target.value)}
                className="border focus:ring-none focus:outline-none p-1 bg-white"
              />
            </div>
            <div className="grid items-center">
              <label htmlFor="material_filter" className="mr-2">
                Material:
              </label>
              <input
                {...register("material")}
                type="text"
                onChange={(e) => handleFilterChange("material", e.target.value)}
                id="material_filter"
                className="border focus:ring-none focus:outline-none p-1 bg-white"
              />
            </div>
            <div className="grid items-center">
              <label htmlFor="genre_filter" className="mr-2">
                Gênero:
              </label>
              <select
                {...register("genre")}
                id="genre_filter"
                onChange={(e) => handleFilterChange("genre", e.target.value)}
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
              onClick={() => clearFilters()}
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
