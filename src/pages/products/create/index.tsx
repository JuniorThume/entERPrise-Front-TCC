import { useNavigate } from "react-router-dom";
import ProductForm from "../../../components/ProductForm";
import { API, refreshTokenRequest } from "../../../api/axios";
import { IProduct } from "../../../interfaces/IProduct";
import { useAppContext } from "../../../context/appContext/hook/useAppContext";
import { AxiosError } from "axios";
import { useNotification } from "../../../context/notifyContext/hook/useNotification";

export interface ISubmitForm {
  product_name: string;
  product_description: string;
  product_code: string;
  product_category: string;
  product_brand: string;
  product_material: string;
  product_genre: string;
  product_image: string;
  button_action: string;
}

const CreateProduct = () => {
  const navigate = useNavigate();
  const contextApp = useAppContext();
  const notification = useNotification();
  const onSubmitForm = async (dados: ISubmitForm) => {
    await API.post(
      "/products",
      JSON.stringify({
        name: dados.product_name,
        code: dados.product_code,
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
          Authorization: `Bearer ${contextApp.token}`,
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
      })
      .catch((error: AxiosError) => {
        if (error.status === 401) {
          notification.notify(error.message);
          refreshTokenRequest(contextApp.setToken);
        }
      });
  };

  return (
    <>
      <h2 className="text-lg 2xl:text-xl mb-[10px]">
        Cadastrar um novo produto
      </h2>
      <ProductForm
        onSubmit={onSubmitForm}
        onUpdate={false}
        closeModal={() => {}}
      />
    </>
  );
};

export default CreateProduct;
