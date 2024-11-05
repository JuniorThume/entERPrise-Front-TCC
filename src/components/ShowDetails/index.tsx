import { useEffect, useState } from "react";
import ShowDetailsItem from "./ShowDetailsItem";
import { API, refreshTokenRequest } from "../../api/axios";
import { useAppContext } from "../../context/appContext/hook/useAppContext";
import { AxiosError } from "axios";

interface IShowProductDetails {
  product_id: string
}

const ShowDetails = ({ product_id }: IShowProductDetails) => {
  const [details, setDetails] = useState([]);
  const contextApp = useAppContext();
  useEffect(() => {
    if (contextApp.token) {
      API.get(`/products/${product_id}/options`, {
        headers: {
          Authorization: `Bearer ${contextApp.token}`,
        },
      })
        .then((response) => response.data)
        .then((data) => setDetails(data))
        .catch((err: AxiosError) => {
          if (err.response?.status === 401) {
            refreshTokenRequest(contextApp.setToken);
          }
        })
    }
  });

  return (
      details.length > 0 ? (
      <div className="grid my-6 justify-items-center ">
        <span className="text-sm place-content-end pb-1">
          Existem {details.length} opções cadastradas.
        </span>
        <div className="grid grid-cols-4 w-2/3 justify-items-center justify-center content-center border p-2">
          <h3>Tamanho</h3>
          <h3>Cor</h3>
          <h3>Quantidade</h3>
          <h3>Preço</h3>
        </div>
        {details.map((_, i) => {
          return <ShowDetailsItem details={_} index={i} />;
        })}
      </div>
    ) : (
        <p className="flex justify-center mt-5">Não existem opções cadastradas</p>
    )
  )
};

export default ShowDetails;
