import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { env } from "@/config/env";
import { getAccessToken, getRefreshToken, saveTokens, clearSession } from "./auth-storage";
import { AuthResponse } from "@/types/auth";
import { ApiResponse } from "@/types/api";
import { mapApiError, apiLogger } from "@/utils/api";

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 30000, // 30 seconds network timeout
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        processQueue(new Error("No refresh token"), null);
        clearSession();
        if (typeof window !== "undefined") window.location.href = "/session-expired";
        return Promise.reject(error);
      }

      try {
        const response = await axios.post<ApiResponse<AuthResponse>>(
          `${env.apiBaseUrl}/auth/refresh`,
          { refreshToken }
        );

        const { accessToken, refreshToken: newRefreshToken } = response.data.data;
        saveTokens(accessToken, newRefreshToken);
        
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }
        
        processQueue(null, accessToken);
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearSession();
        if (typeof window !== "undefined") window.location.href = "/session-expired";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    const mappedError = mapApiError(error);
    apiLogger.error(`API Error on ${originalRequest?.url}`, mappedError);
    return Promise.reject(mappedError);
  }
);
