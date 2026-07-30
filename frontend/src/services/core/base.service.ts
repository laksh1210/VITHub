import { apiClient } from "@/lib/axios";
import { parseResponse, createUploadConfig } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

export abstract class BaseService {
  protected constructor(protected readonly basePath: string) {}

  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await apiClient.get(`${this.basePath}${url}`, config);
    return parseResponse<T>(response);
  }

  protected async post<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    const response = await apiClient.post(`${this.basePath}${url}`, data, config);
    return parseResponse<T>(response);
  }

  protected async put<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    const response = await apiClient.put(`${this.basePath}${url}`, data, config);
    return parseResponse<T>(response);
  }

  protected async patch<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    const response = await apiClient.patch(`${this.basePath}${url}`, data, config);
    return parseResponse<T>(response);
  }

  protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await apiClient.delete(`${this.basePath}${url}`, config);
    return parseResponse<T>(response);
  }

  protected async upload<T>(
    url: string, 
    file: File | File[], 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onProgress?: (progressEvent: any) => void,
    signal?: AbortSignal
  ): Promise<T> {
    const formData = new FormData();
    if (Array.isArray(file)) {
      file.forEach((f) => formData.append("files", f));
    } else {
      formData.append("file", file);
    }

    const config = createUploadConfig(onProgress, signal);
    const response = await apiClient.post(`${this.basePath}${url}`, formData, config);
    return parseResponse<T>(response);
  }

  protected async download(url: string, config?: AxiosRequestConfig): Promise<Blob> {
    const response = await apiClient.get(`${this.basePath}${url}`, {
      ...config,
      responseType: "blob",
    });
    return response.data;
  }
}
