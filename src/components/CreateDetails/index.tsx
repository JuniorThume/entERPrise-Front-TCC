import { zodResolver } from "@hookform/resolvers/zod";
import { CreateOptionsFormSchema } from "../../zodSchemas/product/options/create/schema";
import { useForm } from "react-hook-form";
import { CreateOptionsFormData } from "../../zodSchemas/product/options/create/types";
import { API, refreshTokenRequest } from "../../api/axios";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../context/appContext/hook/useAppContext";
import { AxiosError } from "axios";

interface IProps {
  hiddeCreation: () => void;
  refreshList: () => void;
}

interface IFormData {
  options_size: string;
  options_color: string;
  options_price: number;
  options_quantity: number;
}

const CreateDetails = ({ hiddeCreation, refreshList }: IProps) => {
  const params = useParams();
  const product_id = Number(params.id);
  const contextApp = useAppContext();
  const {
    handleSubmit,
    reset,
    register,
    formState: { isValid },
  } = useForm<CreateOptionsFormData>({
    resolver: zodResolver(CreateOptionsFormSchema),
  });

  const onSubmit = async (data: IFormData) => {
    if (contextApp.token) {
      await API.post(
        `/products/${product_id}/options`,
        JSON.stringify({
          size: data.options_size,
          color: data.options_color,
          price: data.options_price,
          quantity: data.options_quantity,
        }),
        {
          headers: {
            Authorization: `Bearer ${contextApp.token}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.status)
        .then((status) => {
          if (status === 201) {
            refreshList();
            reset();
          }
        })
        .catch((err: AxiosError) => {
          console.log(err);
          if (err.response?.status === 401) {
            alert("Token expirado, revalidando");
            refreshTokenRequest(contextApp.setToken);
          }
        });
    }
  };

  return (
    <div className="w-full border-b mb-5 border-black">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-5 justify-between content-center p-4"
      >
        <div className="flex flex-col items-center">
          <label className="mb-1 text-sm" htmlFor="input_size">
            Tamanho
          </label>
          <input
            {...register("options_size", { required: true })}
            className="bg-white  text-center border p-1 rounded-md border-black text-sm w-[50%] "
            autoComplete="off"
            maxLength={5}
            type="text"
            id="input_size"
          />
        </div>
        <div className="flex flex-col items-center">
          <label className="mb-1 text-sm" htmlFor="input_color">
            Cor
          </label>
          <input
            className="bg-white border w-[70%] p-1 rounded-md border-black text-center text-sm"
            minLength={3}
            {...register("options_color", { required: true })}
            maxLength={15}
            type="text"
            id="input_color"
          />
        </div>
        <div className="flex flex-col items-center ">
          <label className="mb-1 text-sm" htmlFor="input_quantity">
            Quantidade
          </label>
          <input
            className="bg-white w-[50%] text-center p-1 border rounded-md border-black text-sm"
            max={9999}
            {...register("options_quantity", { required: true })}
            min={1}
            type="number"
            defaultValue={1}
            id="input_quantity"
          />
        </div>
        <div className="flex flex-col items-center ">
          <label className="mb-1 text-sm" htmlFor="input_price">
            Preço
          </label>
          <div className=" flex items-center justify-between bg-white border rounded-md border-black p-1 w-[70%]">
            <span className="text-sm font-semibold pr-1 border-r border-black">
              R$
            </span>
            <input
              className="bg-white border-none outline-none w-[80%] text-center text-sm"
              type="number"
              {...register("options_price", { required: true })}
              step={0.1}
              id="input_price"
            />
          </div>
        </div>
        <div className="flex justify-center self-end text-sm transition">
          <button
            type="submit"
            className={`disabled:bg-gray bg-main-green text-white p-2 m-1 transition rounded-md ${
              isValid && "hover:scale-[1.1]"
            }`}
            disabled={!isValid}
          >
            Adicionar
          </button>
          <button
            type="button"
            onClick={() => hiddeCreation()}
            className="bg-remove transition text-white hover:scale-[1.1] rounded-md p-2 m-1"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDetails;
