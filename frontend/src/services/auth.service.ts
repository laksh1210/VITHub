import { BaseService } from "./core/base.service";
import { AuthResponse } from "@/types/auth";
import { LoginInput, RegisterInput } from "@/validators/auth";
import { API_ENDPOINTS } from "@/constants/api";
import { AxiosRequestConfig } from "axios";

class AuthService extends BaseService {
  constructor() {
    super("");
  }

  async login(payload: LoginInput, config?: AxiosRequestConfig): Promise<AuthResponse> {
    return Promise.resolve({
      accessToken: "mock_token",
      refreshToken: "mock_refresh",
      user: {
        id: "mock_user",
        email: payload.email,
        username: payload.username || "mock_user",
        fullName: "Mock User",
        roles: ["STUDENT"],
      }
    });
  }

  async register(payload: RegisterInput, config?: AxiosRequestConfig): Promise<AuthResponse> {
    return Promise.resolve({
      accessToken: "mock_token",
      refreshToken: "mock_refresh",
      user: {
        id: "mock_user",
        email: payload.email,
        username: payload.username,
        fullName: payload.fullName,
        roles: ["STUDENT"],
      }
    });
  }
}

export const authService = new AuthService();
