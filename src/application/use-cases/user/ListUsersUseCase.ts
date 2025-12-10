import type {
  AdminUserListResult,
  IAdminUsersRepository,
} from "@/application/repo/IAdminUsersReopsitory";
import { TYPES } from "@/di/types";

import { inject, injectable } from "inversify";

@injectable()
export class ListUsersUseCase {
  constructor(
    @inject(TYPES.IAdminUsersRepository)
    private AdminUsersRepo: IAdminUsersRepository
  ) {}

  async execute(
    page: number,
    limit: number,
    search: string
  ): Promise<AdminUserListResult> {
    const result = await this.AdminUsersRepo.listUsers(page, limit, search);

    return result;
  }
}
