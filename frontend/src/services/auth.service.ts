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
    return new Promise(resolve => setTimeout(() => resolve({
      accessToken: "mock_token",
      refreshToken: "mock_refresh",
      user: {
        id: "mock_user",
        email: payload.email || "test@test.com",
        username: payload.username || "mock_user",
        fullName: "Mock User",
        roles: ["STUDENT"],
      }
    }), 500));
  }

  async register(payload: RegisterInput, config?: AxiosRequestConfig): Promise<AuthResponse> {
    return new Promise(resolve => setTimeout(() => resolve({
      accessToken: "mock_token",
      refreshToken: "mock_refresh",
      user: {
        id: "mock_user",
        email: payload.email,
        username: payload.username,
        fullName: payload.fullName,
        roles: ["STUDENT"],
      }
    }), 500));
  }
}

export const authService = new AuthService();
