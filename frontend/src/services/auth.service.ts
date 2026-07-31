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
    return this.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, payload, config);
  }

  async register(payload: RegisterInput, config?: AxiosRequestConfig): Promise<AuthResponse> {
    return this.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, payload, config);
  }
}

export const authService = new AuthService();
