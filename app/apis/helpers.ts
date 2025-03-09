import { AxiosError } from "axios";
import { ErrorResponse } from "./helpers.types";

export const catchHandler = (error: AxiosError<ErrorResponse>) => {
  // Handle all 5xx errors
  if (error.response && error.response.status >= 500) {
    return Promise.reject(
      "Error 500: An unexpected error has occurred. Please contact support."
    );
  }

  // For HTML content-type
  const isHTML = error.response?.headers["content-type"]?.includes("text/html");

  if (isHTML) {
    return Promise.reject(
      "Error 404: Not Found. The requested resource could not be found."
    );
  }

  // For CSV content-type
  const isCSV = error.response?.headers["content-type"]?.includes("text/csv");

  if (isCSV && error.response) {
    let message;

    switch (error.response.status) {
      case 401:
        message = "Error 401: Unauthorized. Please check your credentials.";
        break;
      case 403:
        message =
          "Error 403: Forbidden. You do not have permission to access this resource.";
        break;
      case 404:
        message =
          "Error 404: Not Found. The requested resource could not be found.";
        break;
      default:
        message = "An unexpected error has occurred. Please contact support.";
        break;
    }

    return Promise.reject(message);
  }

  if (error.response) {
    return Promise.reject(error.response.data);
  } else if (error.request) {
    return Promise.reject("No response received from the server.");
  } else {
    return Promise.reject("Error setting up the request.");
  }
};
