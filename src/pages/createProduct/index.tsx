import image from "./../../assets/fundo-sem-imagem.png";
import { GrFormNextLink } from "react-icons/gr";
import { FaCheck } from "react-icons/fa6";
import ArrowTooltips from "../../components/ToolTip";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { createProductFormData } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductFormSchema } from "./schema";


const CreateProduct = () => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm<createProductFormData>({
    resolver: zodResolver(createProductFormSchema)
  });
  const [productImg, setProductImg] = useState<string>('');
  
  const input = document.querySelector('#input_img') ? this : undefined;

  const removeUploadImage = () => {
    console.log(input);
    setProductImg('');
  }
  const setProductImgOnChange = async (e) => {
    setProductImg(e.target.files[0]);
  }

  const onSubmit = async (dados: any) => {
    console.log(dados);
    return
  }

  return (
    <div>
      <h2 className="text-lg">Cadastrar um novo produto</h2>
      <div className="w-[100%] border bg-white p-2 rounded-lg p-4 max-h-[450px]">
        <form className="grid grid-cols-[2fr_1fr] gap gap-[150px] h-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col justify-between p-2 w-[100%]">
            <div className="grid grid-cols-2 gap-2 justify-between">
              <div className="flex flex-col">
                <label htmlFor="product_name">Nome:</label>
                <input {...register('product_name', { required: true })} placeholder="Nome do produto" className="bg-white border p-1 rounded-sm placeholder:text-xs" type="text" id="product_name" />
                {/* {errors.product_name && <span className="pt-1 text-[10px] w-[80%] text-red">{ errors.product_name?.message }</span> } */}
              </div>
              <div className="flex flex-col">
                <label htmlFor="input_category">Categoria:</label>
                <input {...register('product_category', { required: true })} placeholder="Categoria do produto" className="bg-white border p-1 rounded-sm placeholder:text-xs" type="text" id="input_category" />
                {/* {errors.product_category && <span className="pt-1 text-[10px] text-red">{ errors.product_category?.message }</span> } */}
              </div>
              <div className="flex flex-col">
                <label htmlFor="input_brand">Marca:</label>
                <input {...register('product_brand', { required: true })} placeholder="Marca do produto" className="bg-white border rounded-sm p-1 placeholder:text-xs" type="text" id="input_brand" />
                {/* {errors.product_brand && <span className="pt-1 text-[10px] w-[80%] text-red">{ errors.product_brand?.message }</span> } */}
              </div>
              <div className="flex flex-col">
                <label htmlFor="input_material">Material:</label>
                <input {...register('product_material', { required: true })} placeholder="Material do produto" className="bg-white border rounded-sm p-1 placeholder:text-xs" type="text" id="input_material" />
                {/* {errors.product_material && <span className="pt-1 text-[10px] w-[80%] text-red">{ errors.product_material?.message }</span> } */}
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="input_textarea">Descrição</label>
              <textarea {...register('product_description', { required: false })} placeholder="Uma breve descrição sobre o produto" rows={3} maxLength={255} id="input_textarea" className=" max-h-content placeholder:text-xs w-full resize-none p-1 bg-white border rounded-sm" />
            </div>
            <div className=" flex justify-between">
              <button type="submit" className="flex justify-center items-center border w-[30%] px-2 rounded-lg text-main-green border-main-green">
                <p className="mr-2">Criar</p>
                <FaCheck size={16} color='main_green' />
              </button>
              <div className="flex items-center">
                <ArrowTooltips title="Você seguirá para a tela de registro de tamanhos, cores e valores."/>
                <button type="submit" className="flex items-center"> {/*TODO Corrigir o link */}
                  <div className="flex justify-center items-center text-white border px-2 rounded-lg bg-main-green">
                    <p className="mr-2">Criar e Seguir</p>
                    <GrFormNextLink size={20} />
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="text-white">
            {productImg && <button type='reset' onClick={removeUploadImage} className="p-1 bg-red hover:cursor-pointer text-black absolute">X</button>}
            <img src={productImg ? productImg : image} alt="Imagem do produto" id="input_img" className="rounded-lg w-[100%]" />
            <div className="relative text-black w-full flex justify-center">
              <input type="file" className="text-xs mt-1" onChange={setProductImgOnChange} value={productImg}/>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
