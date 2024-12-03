import { AxiosError } from "axios";
import { api } from "./config";

export interface IAuthResponse {
  id: string;
  name: string;
  email: string;
  token: string;
  refreshToken: string;
}

export interface IResponseError {
  code: 0;
  type: "string";
  message: "string";
}

export type ProfileResponse = Omit<IAuthResponse, "token" | "refreshToken">;

async function register(payload: {
  email: string;
  password: string;
  name: string;
}) {
  try {
    const { data, status } = await api.post<IAuthResponse>(
      "/auth/register",
      payload
    );
    return { data, status };
  } catch (error) {
    console.log({ error });
    return {
      data: (error as AxiosError<IResponseError>).response?.data,
      status: (error as AxiosError<IResponseError>).response?.status,
    };
  }
}

async function signin(payload: { email: string; password: string }) {
  try {
    const { data, status } = await api.post<IAuthResponse>(
      "/auth/login",
      payload
    );
    return { data, status };
  } catch (error) {
    console.log({ error });
    return {
      data: (error as AxiosError<IResponseError>).response?.data,
      status: (error as AxiosError<IResponseError>).response?.status,
    };
  }
}

async function getMe() {
  try {
    const { data, status } = await api.get<ProfileResponse>("/auth/me");
    return { data, status };
  } catch (error) {
    console.log({ error });
    return {
      data: (error as AxiosError<IResponseError>).response?.data,
      status: (error as AxiosError<IResponseError>).response?.status,
    };
  }
}

export const auth = { register, signin, getMe };
