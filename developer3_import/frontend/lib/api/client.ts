import axios, { type AxiosResponse } from "axios";
import type { ApiResponse } from "@/lib/types/common";

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || "http://localhost:8080/api";

export const apiClient = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 15_000,
});

export async function unwrap<T>(
  request: Promise<AxiosResponse<ApiResponse<T>>>
): Promise<T> {
  const response = await request;
  const payload = response.data;

  if (!payload.success) {
    throw new Error(payload.message || "The backend rejected the request.");
  }

  return payload.data;
}
