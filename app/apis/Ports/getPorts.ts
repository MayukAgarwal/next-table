import axios, { AxiosResponse, AxiosError } from "axios";
import { catchHandler } from "../helpers";
import { ErrorResponse } from "../helpers.types";
import { PortData } from "@/app/types/ports";

export type PortDataResponse = {
  data: PortData[];
  lastPage: number;
};

export type QueryParams = {
  name?: string;
  city?: string;
  country?: string;
  province?: string;
  timezone?: string;
  q?: string; // Perform search on all fields
  _sort?: string; // Sort by a field
  _page?: number; // Page number
  _limit?: number; // Number of records per page
};

const URL = "http://localhost:5000/ports";

export const getPortsData = (
  queryParams: QueryParams
): Promise<PortDataResponse> => {
  return axios
    .get(URL, {
      params: queryParams,
    })
    .then((response: AxiosResponse<PortData[]>) => {
      const lastPageMatch = response.headers.link.match(
        /<[^>]+_page=(\d+)[^>]*>;\s*rel="last"/
      );
      const lastPage = lastPageMatch ? parseInt(lastPageMatch[1], 10) : null;
      return { data: response.data, lastPage: lastPage || 0 };
    })
    .catch((error: AxiosError<ErrorResponse>) => catchHandler(error));
};
