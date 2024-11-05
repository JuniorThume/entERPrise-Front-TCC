import axios, { AxiosError } from "axios";
import Cookies from 'js-cookie';

export const API = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const refreshTokenRequest = async (setToken: (data: string) => void ) => {
  return await API.post(
    "/auth/refresh-token",
    JSON.stringify({
      access_token: Cookies.get("access_token"),
    })
  )
    .then((response) => response.data)
    .then(async (data) => {
      Cookies.remove("access_token");
      Cookies.set("access_token", data);
      setToken(data);
    })
    .catch((err: AxiosError) => {
      console.log(err);
    });
};
