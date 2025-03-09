import axios, { AxiosResponse, AxiosError } from "axios";
import { catchHandler } from "../helpers";
import { ErrorResponse } from "../helpers.types";
import { PortData } from "@/app/types/ports";

export type PortDataResponse = {
  data: PortData[];
};

const URL = "http://localhost:5000/ports";

export const updatePort = (portData: PortData): Promise<PortData> => {
  return axios
    .put(`${URL}/${portData.id}`, portData)
    .then((response: AxiosResponse<PortData>) => response.data)
    .catch((error: AxiosError<ErrorResponse>) => catchHandler(error));
};
