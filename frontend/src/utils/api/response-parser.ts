import { AxiosResponse } from "axios";
import { ApiResponse } from "@/types/api";

export function parseResponse<T>(response: AxiosResponse<ApiResponse<T>>): T {
  const data = response.data;
  
  if (data && typeof data === 'object' && 'data' in data && 'success' in data) {
    if (!data.success) {
       throw new Error(data.message || "API returned success: false");
    }
    return data.data;
  }
  
  return data as unknown as T;
}
