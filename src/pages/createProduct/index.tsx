import { useNavigate } from "react-router-dom";
import ProductForm from "../../components/ProductForm";
import { API } from "../../api/axios";
import { IProduct } from "../../interfaces/IProduct";
import PrivateLayout from "../../components/PrivateLayout";
import AppContext from "../../context/AppContext";
import { useContext } from "react";

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
  const { user } = useContext(AppContext);
  const onSubmitForm = async (dados: ISubmitForm) => {
    console.log(dados.button_action);
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
          "Authorization": `Bearer ${user?.token}`,
        },
      }
    )
      .then((response) => response.data)
      .then((data: IProduct) => {
        alert(dados.button_action)
        switch (dados.button_action) {
          case "update":
            break;
          case "create":
            navigate("/products");
            break;
          case "create_follow":
            alert(data.id);
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
