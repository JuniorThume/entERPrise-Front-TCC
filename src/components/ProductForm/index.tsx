import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa6";
import { GrFormNextLink } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import ArrowTooltips from "../ToolTip";
import image from "./../../assets/fundo-sem-imagem.png";
import { ProductFormData } from "../../zodSchemas/product/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductFormSchema } from "../../zodSchemas/product/schema";
import { ISubmitForm } from "../../pages/createProduct";
import { IProduct } from "../../interfaces/IProduct";
import { IoIosClose } from "react-icons/io";
import { convertFileToBase64 } from "../../utils/base64ToBlob";

interface IFormProps {
  onSubmit: (dados: ISubmitForm) => void;
  onUpdate: boolean;
  closeModal: (state: boolean) => void;
  product?: IProduct;
}

const ProductForm = ({
  onSubmit,
  onUpdate,
  closeModal,
  product,
}: IFormProps) => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    setValue,
  } = useForm<ProductFormData>({
    resolver: zodResolver(ProductFormSchema),
  });
  const [productImgFile, setProductImgFile] = useState(onUpdate ? product?.image : "");
  const imageInput = useRef<HTMLInputElement>(null);
  const [defaultOption, setDefaultOption] = useState(true);

  const removeUploadImage = () => {
    setProductImgFile("");
    if (imageInput.current) imageInput.current.value = "";
  };
  const setProductImgOnChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files !== null) {
      const prod_value = await convertFileToBase64(e.target.files[0]);
      setProductImgFile(URL.createObjectURL(e.target.files[0]));
      setValue("product_image", prod_value);
    }
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
              defaultValue={product ? product.name : ""}
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
              defaultValue={product ? product.category : ""}
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
              defaultValue={product ? product.brand : ""}
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
              defaultValue={product ? product.material : ""}
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
                defaultValue={product ? product.genre : ""}
              >
                {defaultOption && (
                  <option value="" className="text-xs">
                    Selecione
                  </option>
                )}
                <option value="Feminino">Feminino</option>
                <option value="Infantil">Infantil</option>
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
              defaultValue={product ? product.description : ""}
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

          {onUpdate ? (
            <>
              <div className="flex justify-start items-center w-full text-lg ">
                <input
                  type="hidden"
                  {...register("button_action", { required: false })}
                />
                <button
                  type="submit"
                  onMouseUp={() => setValue('button_action', 'update')}
                  className={`w-full flex justify-center items-center px-2 rounded-lg bg-blue_light text-white`}
                >
                  <p className="mr-2">Atualizar</p>
                  <FaCheck size={16} color="blue_light" />
                </button>
              </div>
              <div className="flex justify-end items-center ">
                <button
                  type="reset"
                  className={`flex items-center w-[70%]`}
                  onMouseUp={() => closeModal(false)}
                >
                  <div
                    className={`flex justify-center items-center text-lg border w-full px-2 rounded-lg bg-white text-red`}
                  >
                    <p className="mr-2">Cancelar</p>
                    <IoIosClose size={24} />
                  </div>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-start items-center w-full text-lg">
                <button
                  type="submit"
                  onMouseUp={() => setValue('button_action', 'create')}
                  className="w-[80%] flex justify-center items-center border px-2 rounded-lg text-main-green border-main-green"
                >
                  <p className="mr-2">Criar</p>
                  <FaCheck size={16} color="main_green" />
                </button>
              </div>
              <div className="flex justify-center items-center">
                <ArrowTooltips title="Você seguirá para a tela de registro de tamanhos, cores e valores." />
                <button
                  type="submit"
                  className="flex items-center w-[100%] "
                  onMouseUp={() => setValue('button_action', 'create_follow')}
                >
                  <div className="flex justify-center items-center text-white text-lg border w-full px-2 rounded-lg bg-main-green">
                    <p className="mr-2">Criar e Seguir</p>
                    <GrFormNextLink size={20} />
                  </div>
                </button>
              </div>
            </>
          )}
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
            {...register("product_image")}
            ref={imageInput}
            className="text-[10px] text-black mt-1"
            onChange={setProductImgOnChange}
          />
        </div>
      </form>
      <div id="show_input_errors" className="w-full text-red text-xs mt-[4px]">
        {Object.values(errors).map((error) => {
          return <p>{error.message}</p>;
        })}
      </div>
    </>
  );
};

export default ProductForm;
