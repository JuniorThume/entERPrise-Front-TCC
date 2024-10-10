import { useNavigate } from "react-router-dom";
import ProductForm from "../../components/ProductForm";

export interface ISubmitForm {
  product_name: string;
  product_description: string;
  product_category: string;
  product_brand: string;
  product_material: string;
  product_genre: string;
}

const CreateProduct = () => {

  const navigate = useNavigate();
  const onSubmitForm = async (dados: ISubmitForm) => {
    console.log(JSON.stringify(dados))
    await fetch('http://localhost:3000/api/v1/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: dados.product_name,
        description: dados.product_description,
        category: dados.product_category,
        brand: dados.product_brand,
        material: dados.product_material,
        genre: "Masculino"
      })
    }).then((data) => {
      console.log(data.json());
      navigate('/products')
    }).catch(() => {
      console.error('joje');
    })
  }

  return (
    <div>
      <h2 className="text-lg 2xl:text-xl mb-[10px]">Cadastrar um novo produto</h2>
      <ProductForm onSubmit={onSubmitForm} onUpdate={ false } closeModal={() => {}} />
    </div>
  );
};

export default CreateProduct;
