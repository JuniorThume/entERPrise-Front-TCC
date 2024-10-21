import { useNavigate } from "react-router-dom";
import ProductForm from "../../components/ProductForm";
import { API } from "../../api/axios";
import { IProduct } from "../../interfaces/IProduct";
import PrivateLayout from "../../components/PrivateLayout";
import { useAppContext } from "../../context/appContext/hook/useAppContext";

export interface ISubmitForm {
  product_name: string;
  product_description: string;
  product_category: string;
  product_brand: string;
  product_material: string;
  product_genre: string;
  product_image: string;
  button_action: string;
}

const CreateProduct = () => {
  const navigate = useNavigate();
  const context = useAppContext();
  const onSubmitForm = async (dados: ISubmitForm) => {
    await API.post(
      "/products",
      JSON.stringify({
        name: dados.product_name,
        description: dados.product_description,
        category: dados.product_category,
        brand: dados.product_brand,
        material: dados.product_material,
        genre: dados.product_genre,
        image: dados.product_image,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${context.token}`,
        },
      }
    )
      .then((response) => response.data)
      .then((data: IProduct) => {
        switch (dados.button_action) {
          case "create":
            navigate("/products");
            break;
          case "create_follow":
            navigate(`/products/${data.id}/details/create`);
            break;
        }
      });
  };

  return (
    <PrivateLayout>
      <h2 className="text-lg 2xl:text-xl mb-[10px]">
        Cadastrar um novo produto
      </h2>
      <ProductForm
        onSubmit={onSubmitForm}
        onUpdate={false}
        closeModal={() => {}}
      />
    </PrivateLayout>
  );
};

export default CreateProduct;
