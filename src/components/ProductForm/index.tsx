import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa6";
import { GrFormNextLink } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import ArrowTooltips from "../ToolTip";
import image from "./../../assets/fundo-sem-imagem.png";
import { createProductFormData } from "../../pages/createProduct/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductFormSchema } from "../../pages/createProduct/schema";
import { ISubmitForm } from "../../pages/createProduct";

interface IFormProps {
  onSubmit: (dados: ISubmitForm) => void;
}

// const convertFileToBase64 = (file: File): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file as Blob);
//     reader.onloadend = () => {
//       const base64String = reader.result as string;
//       const base64 = base64String.split(",")[1];
//       if (base64) resolve(base64);
//     };
//     reader.onerror = (error) => reject(error);
//   });
// };

const ProductForm = ({ onSubmit }: IFormProps) => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<createProductFormData>({
    resolver: zodResolver(createProductFormSchema),
  });
  const [productImgFile, setProductImgFile] = useState("");
  // const [productImgBase64, setProductImgBase64] = useState("");
  const imageInput = useRef<HTMLInputElement>(null);

  const [defaultOption, setDefaultOption] = useState(true);

  const removeUploadImage = () => {
    setProductImgFile("");
    if (imageInput.current) imageInput.current.value = "";
  };
  const setProductImgOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) {
      throw new Error("A imagem é invalida")
    }
    // setProductImgBase64(await convertFileToBase64(e.target.files[0]));

    setProductImgFile(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <>
      <form
        id="create_product_form"
        className="grid grid-cols-[2fr_1fr] md:gap-[50px] w-[100%] border bg-white p-2 rounded-lg text-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-2 gap-2 grid-rows-auto justify-between w-full">
          <div className="flex flex-col justify-center">
            <label htmlFor="input_name">Nome:</label>
            <Controller
              name="product_name"
              control={control}
              render={({ field }) => {
                return (
                  <input
                    {...field}
                    id="input_name"
                    autoComplete="off"
                    className={`bg-white border p-1 rounded-sm placeholder:text-xs ${
                      errors.product_name ? "border-red" : "border-black"
                    }`}
                    placeholder="Nome do produto"
                  />
                );
              }}
              rules={{ required: true }}
            />
          </div>
          <div className="flex flex-col justify-center">
            <label htmlFor="input_category">Categoria:</label>
            <Controller
              name="product_category"
              control={control}
              render={({ field }) => {
                return (
                  <input
                    {...field}
                    id="input_category"
                    autoComplete="off"
                    className={`bg-white border p-1 rounded-sm placeholder:text-xs ${
                      errors.product_category ? "border-red" : "border-black"
                    }`}
                    placeholder="Categoria do produto"
                  />
                );
              }}
              rules={{ required: true }}
            />
          </div>
          <div className="flex flex-col justify-center">
            <label htmlFor="input_brand">Marca:</label>
            <Controller
              name="product_brand"
              control={control}
              render={({ field }) => {
                return (
                  <input
                    {...field}
                    id="input_brand"
                    autoComplete="off"
                    className={`bg-white border p-1 rounded-sm placeholder:text-xs ${
                      errors.product_brand ? "border-red" : "border-black"
                    }`}
                    placeholder="Marca do produto"
                  />
                );
              }}
              rules={{ required: true }}
            />
          </div>
          <div className="flex flex-col justify-center">
            <label htmlFor="input_material">Material:</label>
            <Controller
              name="product_material"
              control={control}
              render={({ field }) => {
                return (
                  <input
                    {...field}
                    id="input_material"
                    autoComplete="off"
                    className={`bg-white border p-1 rounded-sm placeholder:text-xs ${
                      errors.product_material ? "border-red" : "border-black"
                    }`}
                    placeholder="Material do produto"
                  />
                );
              }}
              rules={{ required: true }}
            />
          </div>
          <div className="flex flex-col justify-center">
            <label htmlFor="input_genre">Gênero:</label>
            <div>
              <select
                id="input_genre"
                {...register("product_genre", { required: true })}
                onChange={() => {
                  setDefaultOption(false);
                }}
                className={`bg-white text-black border p-1 rounded-sm placeholder:text-xs ${
                  errors.product_genre ? "border-red" : "border-black"
                }`}
              >
                {defaultOption && (
                  <option value="" className="text-xs">
                    Selecione
                  </option>
                )}
                <option value="Feminino">Feminino</option>
                <option value="Masculino">Masculino</option>
                <option value="Unissex">Unissex</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col col-span-2 justify-center">
            <label htmlFor="input_textarea">Descrição</label>
            <Controller
              name="product_description"
              control={control}
              render={({ field }) => {
                return (
                  <textarea
                    {...field}
                    id="input_textarea"
                    rows={3}
                    maxLength={255}
                    className="max-h-content placeholder:text-xs w-full resize-none p-1 bg-white border rounded-sm"
                    placeholder="Uma breve descrição sobre o produto"
                  />
                );
              }}
              rules={{ required: false }}
            />
          </div>
          <div className="flex justify-start items-center w-full text-lg">
            <button
              type="submit"
              className="w-[80%] flex justify-center items-center border px-2 rounded-lg text-main-green border-main-green"
            >
              <p className="mr-2">Criar</p>
              <FaCheck size={16} color="main_green" />
            </button>
          </div>
          <div className="flex justify-center items-center">
            <ArrowTooltips title="Você seguirá para a tela de registro de tamanhos, cores e valores." />
            <button type="submit" className="flex items-center w-[100%] ">
              <div className="flex justify-center items-center text-white text-lg border w-full px-2 rounded-lg bg-main-green">
                <p className="mr-2">Criar e Seguir</p>
                <GrFormNextLink size={20} />
              </div>
            </button>
          </div>
        </div>
        <div className="text-white flex flex-col justify-self-center self-center">
          <div className="relative text-black w-full flex justify-center">
            {productImgFile && (
              <button
                formTarget="create_product_form"
                type="button"
                onClick={removeUploadImage}
                className="p-1 text-black bg-white hover:cursor-pointer text-black absolute right-[2px] top-[2px] rounded-[25px]"
              >
                <MdDelete />
              </button>
            )}
            <img
              src={productImgFile ? productImgFile : image}
              alt="Imagem do produto"
              id="input_img"
              className="rounded-lg w-full lg:w-[300px] lg:h-[300px] object-fill"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            ref={imageInput}
            className="text-[10px] text-black mt-1"
            onChange={setProductImgOnChange}
          />
        </div>
      </form>
      <div id="show_input_errors" className="w-full text-red text-xs mt-[4px]">
        {Object.values(errors).map(error => {
          return (
            <p>{ error.message }</p>
          )
        })}
      </div>
    </>
  );
};

export default ProductForm;