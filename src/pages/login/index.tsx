import { useForm } from "react-hook-form";
import { LoginFormData } from "../../zodSchemas/login/types";
import { LoginFormSchema } from "../../zodSchemas/login/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AppContext, { UserType } from "../../context/appContext/AppContext";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { API } from "../../api/axios";
import { AxiosError } from "axios";
import Cookies from "js-cookie";

export type jwtData = JwtPayload & {
  user: UserType;
};

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
  });
  const navigate = useNavigate();
  const { setIsLogged, setUser } = useContext(AppContext);
  const onSubmit = async (dados: LoginFormData) => {
    await API.post(
      "/auth",
      JSON.stringify({ username: dados.username, password: dados.password })
    )
      .then((response) => response.data)
      .then((token) => {
        if (token) {
          Cookies.set('access_token', token)
          const jwt_data: jwtData = jwtDecode(token);
          setUser({
            id: jwt_data.user.id,
            username: jwt_data.user.username,
          });
          setIsLogged(true);
          navigate("/");
        }
      })
      .catch((err: AxiosError) => {
        if (err.status === 401) {
          alert("Usuário ou senha inválidos!");
        }
      });
  };

  return (
    <div className="w-full flex justify-center items-center text-lg">
      <div className="border border-none shadow-md w-1/3 p-8 flex flex-col gap-5 rounded-[20px] bg-main">
        <h1 className="text-white text-center text-2xl">LOGIN</h1>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <label className="text-white" htmlFor="username_input">
              Usuário
            </label>
            <input
              {...register("username", { required: true })}
              className={`bg-white pl-1 placeholder:text-sm border ${
                errors.username ? "border-red" : "border-transparent"
              } `}
              type="text"
              id="username_input"
              placeholder="Nome do usuário"
            />
            <p className="text-xs h-[5px] pt-[1px]">
              {errors.username ? errors.username.message : ""}
            </p>
          </div>
          <div className="flex flex-col">
            <label className="text-white" htmlFor="password_input">
              Senha
            </label>
            <input
              {...register("password", { required: true })}
              className={`bg-white pl-1 placeholder:text-sm border ${
                errors.password ? "border-red" : "border-transparent"
              }`}
              type="password"
              id="password_input"
              placeholder="Senha de acesso"
            />
            <p className="text-xs h-[5px] pt-[1px]">
              {errors.password ? errors.password.message : ""}
            </p>
          </div>
          <button
            className="border w-1/2 self-center text-main bg-white rounded-md mt-8"
            type="submit"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
