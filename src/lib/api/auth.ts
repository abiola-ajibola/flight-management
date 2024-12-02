import axios, { AxiosError } from "axios";

const baseURL = "/";

const api = axios.create({
  baseURL,
});

export interface IRegisterResponse {
  id: string;
  name: string;
  email: string;
  token: string;
  refreshToken: string;
}

export interface IRegisterResponseError {
  code: 0;
  type: "string";
  message: "string";
}

export async function register(payload: {
  email: string;
  password: string;
  name: string;
}) {
  try {
    const { data, status } = await api.post<IRegisterResponse>(
      "/auth/register",
      payload
    );
    return { data, status };
  } catch (error) {
    console.log({ error });
    return {
      data: (error as AxiosError<IRegisterResponseError>).response?.data,
      status: (error as AxiosError<IRegisterResponseError>).response?.status,
    };
  }
}
