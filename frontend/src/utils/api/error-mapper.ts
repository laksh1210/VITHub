import { ApiError } from "@/types/api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapApiError(error: any): ApiError {
  if (error.response) {
    const status = error.response.status;
    const data = error.response.data;
    
    if (data && data.message) {
      return {
        status,
        message: data.message,
        code: data.code,
        details: data.details,
      };
    }

    switch (status) {
      case 400: return { status, message: "Bad Request. Please check your input." };
      case 401: return { status, message: "Unauthorized. Please log in again." };
      case 403: return { status, message: "Forbidden. You don't have permission to perform this action." };
      case 404: return { status, message: "Not Found. The requested resource does not exist." };
      case 409: return { status, message: "Conflict. The resource already exists." };
      case 422: return { status, message: "Unprocessable Entity. Validation failed." };
      case 429: return { status, message: "Too Many Requests. Please try again later." };
      case 500: return { status, message: "Internal Server Error. Please try again later." };
      case 503: return { status, message: "Service Unavailable. The server is currently down." };
      default: return { status, message: `An error occurred. Status: ${status}` };
    }
  } else if (error.request) {
    if (error.code === 'ECONNABORTED') {
      return { status: 408, message: "Request Timeout. Please check your internet connection." };
    }
    return { status: 0, message: "Network Error. Please check your internet connection." };
  }
  
  return { status: -1, message: error.message || "An unknown error occurred." };
}
