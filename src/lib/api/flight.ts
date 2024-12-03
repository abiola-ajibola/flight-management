import { AxiosError } from "axios";
import { IResponseError } from "./auth";
import { api } from "./config";
import { toast } from "react-toastify";

export interface IFlightData {
  id: string;
  code: string;
  capacity: number;
  departureDate: string;
  status: string;
  img: string;
}

export interface IFlightResponse {
  total: number;
  count: number;
  resources: IFlightData[];
}

export type TFlightQuery = {
  page: number;
  size: number;
  code?: string;
};

export type FlightFormValues = Omit<IFlightData, "id" | "status">;

export async function get(query: TFlightQuery) {
  try {
    const { data, status } = await api.get<IFlightResponse>("/flights", {
      params: query,
    });
    return { data, status };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log({ error });
    toast(error.message, { type: "error", hideProgressBar: true });
    return {
      data: (error as AxiosError<IResponseError>).response?.data,
      status: (error as AxiosError<IResponseError>).response?.status,
    };
  }
}

export async function getOne(id: string) {
  try {
    const { data, status } = await api.get<IFlightData>(
      "/flights/" + id + "/details"
    );
    return { data, status };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log({ error });
    toast(error.message, { type: "error", hideProgressBar: true });
    return {
      data: (error as AxiosError<IResponseError>).response?.data,
      status: (error as AxiosError<IResponseError>).response?.status,
    };
  }
}

export async function create(formData: FormData) {
  console.log({ formData });
  try {
    const { data, status } = await api.post<FlightFormValues>(
      "/flights/withPhoto",
      formData
    );
    toast("Success", { type: "success", hideProgressBar: true });
    return { data, status };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log({ error });
    toast(error.message, { type: "error", hideProgressBar: true });
    return {
      data: (error as AxiosError<IResponseError>).response?.data,
      status: (error as AxiosError<IResponseError>).response?.status,
    };
  }
}

export async function update(formData: FormData) {
  console.log({ formData });
  try {
    const { data, status } = await api.put<FlightFormValues>(
      "/flights/withPhoto",
      formData
    );
    toast("Success", { type: "success", hideProgressBar: true });
    return { data, status };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log({ error });
    toast(error.message, { type: "error", hideProgressBar: true });
    return {
      data: (error as AxiosError<IResponseError>).response?.data,
      status: (error as AxiosError<IResponseError>).response?.status,
    };
  }
}

export async function deleteOne(id: string) {
  try {
    const { data, status } = await api.delete("/flights/" + id);
    toast("Success", { type: "success", hideProgressBar: true });
    return { data, status };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log({ error });
    toast(error.message, { type: "error", hideProgressBar: true });
    return {
      data: (error as AxiosError<IResponseError>).response?.data,
      status: (error as AxiosError<IResponseError>).response?.status,
    };
  }
}

export const flights = { get, getOne, create, update, deleteOne };
