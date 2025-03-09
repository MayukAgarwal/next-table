import axios, { AxiosResponse, AxiosError } from "axios";
import { ErrorResponse } from "../helpers.types";
import { catchHandler } from "../helpers";
import { PortData } from "@/app/types/ports";

export type PortDataResponse = {
  data: PortData[];
};

const URL = "http://localhost:5000/ports";

export const createPort = (portData: PortData): Promise<PortData> => {
  return axios
    .post(URL, portData)
    .then((response: AxiosResponse<PortData>) => response.data)
    .catch((error: AxiosError<ErrorResponse>) => catchHandler(error));
};
