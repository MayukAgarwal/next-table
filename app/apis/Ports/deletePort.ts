import axios, { AxiosResponse, AxiosError } from "axios";
import { ErrorResponse } from "../helpers.types";
import { catchHandler } from "../helpers";
import { PortData } from "@/app/types/ports";

export type PortDataResponse = {
  data: PortData[];
};

const URL = "http://localhost:5000/ports";

export const deletePort = (id: string): Promise<void> => {
  return axios
    .delete(`${URL}/${id}`)
    .then((response: AxiosResponse<void>) => response.data)
    .catch((error: AxiosError<ErrorResponse>) => catchHandler(error));
};
