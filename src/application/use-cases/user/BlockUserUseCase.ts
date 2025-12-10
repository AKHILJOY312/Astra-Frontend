import type { IAdminUsersRepository } from "@/application/repo/IAdminUsersReopsitory";
import { TYPES } from "@/di/types";
import type { UserModal } from "@/domain/entities/user/User";

import { inject, injectable } from "inversify";

@injectable()
export class BlockUserUseCase {
  constructor(
    @inject(TYPES.IAdminUsersRepository)
    private AdminUsersRepo: IAdminUsersRepository
  ) {}

  async execute(userId: string): Promise<UserModal> {
    const result = await this.AdminUsersRepo.blockUser(userId);

    return result;
  }
}
