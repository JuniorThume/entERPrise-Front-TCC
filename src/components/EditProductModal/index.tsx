import { MdOutlineModeEdit } from "react-icons/md";
import ModalWrapper from "../ModalWrapper";
import { useState } from "react";
import { IProduct } from "../../interfaces/IProduct";
import ProductForm from "../ProductForm";
import { ProductFormData } from "../../zodSchemas/product/types";
import { API } from "../../api/axios";
import { useAppContext } from "../../context/appContext/hook/useAppContext";

interface IEditProductProps {
  product: IProduct;
  refreshFunc: () => void;
}

const EditProductModal = ({ product, refreshFunc }: IEditProductProps) => {
  const [modalState, setModalState] = useState<boolean>(false);
  const context = useAppContext();
  const handleUpdateProduct = async (data: ProductFormData) => {
    console.log(data);
    await API.put(
      `/products/${product.id}`,
      JSON.stringify({
        name: data.product_name,
        description: data.product_description,
        category: data.product_category,
        brand: data.product_brand,
        material: data.product_material,
        genre: data.product_genre,
        image: data.product_image,
      }),
      {
        headers: {
          Authorization: `Bearer ${context.token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.data)
      .then(() => {
        setModalState(false);
      });
    refreshFunc();
  };
  return (
    <button
      className="rounded-md p-1 mx-1 hover:scale-110"
      onClick={() => setModalState(true)}
    >
      <MdOutlineModeEdit size={24} color="#60a5fa" />
      <ModalWrapper
        modalState={modalState}
        setModalState={setModalState}
        modalTitle="Alterar Produto"
        children={
          <ProductForm
            onSubmit={handleUpdateProduct}
            onUpdate={true}
            closeModal={setModalState}
            product={product}
          />
        }
      />
    </button>
  );
};

export default EditProductModal;
