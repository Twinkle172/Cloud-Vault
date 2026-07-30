import api from "../api/axios";
import type { AuthResponse, LoginPayload, RegisterPayload } from "../types/user";

export const authService = {
  login: async (payload: LoginPayload) => {
    const response = await api.post<AuthResponse>("/auth/login", payload);
    return response.data;
  },

  register: async (payload: RegisterPayload) => {
    const response = await api.post<AuthResponse>("/auth/register", payload);
    return response.data;
  },
};
