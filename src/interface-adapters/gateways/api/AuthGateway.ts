import type { User } from "@/domain/entities/user/User";
import { api } from "./ApiGateway";

export interface AuthGateway {
  login(
    email: string,
    password: string
  ): Promise<{ user: User; token: string }>;
  register(
    email: string,
    password: string,
    name: string
  ): Promise<{ user: User; token: string }>;
}

export class AuthGatewayImpl implements AuthGateway {
  async login(email: string, password: string) {
    const res = await api.post("/auth/login", { email, password });
    return res.data;
  }

  async register(email: string, password: string, name: string) {
    const res = await api.post("/auth/register", { email, password, name });
    return res.data;
  }
}
