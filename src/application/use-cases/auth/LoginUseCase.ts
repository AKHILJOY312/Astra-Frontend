import type { User } from "@/domain/entities/user/User";
import type { AuthGateway } from "@/interface-adapters/gateways/api/AuthGateway";

export class LoginUseCase {
  constructor(private authGateway: AuthGateway) {}

  async execute(
    email: string,
    password: string
  ): Promise<{ user: User; token: string }> {
    return this.authGateway.login(email, password);
  }
}
