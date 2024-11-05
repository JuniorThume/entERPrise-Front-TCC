import { MdNavigateNext } from "react-icons/md";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import CreateDetails from "../../../../components/CreateDetails";
import { useEffect, useState } from "react";
import ShowDetails from "../../../../components/ShowDetails";
import ShowProduct from "../../../../components/ShowProduct";
import { IProduct } from "../../../../interfaces/IProduct";
import { API, refreshTokenRequest } from "../../../../api/axios";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../../../context/appContext/hook/useAppContext";
import { AxiosError } from "axios";

const CreateProductDetails = () => {
  const [createDetailsStatus, setCreateDetailsStatus] = useState(false);
  const params = useParams();
  const contextApp = useAppContext();
  const [product, setProduct] = useState<IProduct>();
  const [refreshList, setRefreshList] = useState(false);

  const handleRefreshList = () => {
    setRefreshList(prev =>!prev);
  }

  const CreateDetailClickHandler = () => {
    if (createDetailsStatus) return setCreateDetailsStatus(false);
    return setCreateDetailsStatus(true);
  };

  useEffect(() => {
    if (contextApp.token) {
      API.get(`/products/${params.id}`, {
        headers: {
          Authorization: `Bearer ${contextApp.token}`,
        }
      })
        .then((response) => response.data)
        .then((data: IProduct) => {
          if (data.image) {
            data.image = `data:image/png;base64,${data.image}`;
          }
          setProduct(data);
        }).catch((err: AxiosError) => {
          if (err.response?.status === 401) {
            alert("Sua sessão havia expirado! Ela foi reestabelicida automaticamente.");
            refreshTokenRequest(contextApp.setToken);
          }
        })
    }
  }, [params.id, contextApp.token, contextApp.setToken, refreshList]);
  return (
    <>
      <div className="flex flex-col text-black">
        <div className="flex items-center">
          <h2 className="text-lg">Cadastrar um novo produto</h2>
          <MdNavigateNext size={20} />
          <h3 className="text-sm opacity-[70%]">
            Adicionar detalhes ao produto
          </h3>
        </div>
        <ShowProduct product={product as IProduct} onModal={false} />
        <div className="flex justify-end">
          <button
            type="button"
            onClick={CreateDetailClickHandler}
            className="text-sm flex justify-center items-center border border-white rounded-md mt-3 px-2 py-1 bg-main text-white "
          >
            <span className="pr-2">Adicionar detalhes</span>
            <MdOutlinePlaylistAdd size={24} />
          </button>
        </div>
        {createDetailsStatus ? (
          <CreateDetails hiddeCreation={CreateDetailClickHandler} refreshList={handleRefreshList} />
        ) : null}
        <ShowDetails product_id={params.id as string}/>
      </div>
    </>
  );
};

export default CreateProductDetails;
