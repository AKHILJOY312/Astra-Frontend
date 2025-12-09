import type {
  AdminUserListResult,
  IAdminUsersRepository,
} from "@/application/repo/IAdminUsersReopsitory";
import * as adminUserApi from "../api/AdminUsersApi";
import { userResponseToModal } from "../mappers/userMapper";
import type { User, UserModal } from "@/domain/entities/user/User";

export class AdminUserRepositoryImpl implements IAdminUsersRepository {
  async listUsers(
    page: number,
    limit: number,
    search: string
  ): Promise<AdminUserListResult> {
    const dto = await adminUserApi.getAllUserForAdmin(page, limit, search);
    return {
      users: dto.data.users.map(userResponseToModal),
      page: dto.data.page,
      limit: dto.data.limit,
      total: dto.data.total,
      totalPages: dto.data.totalPages,
    };
  }

  async blockUser(userId: string): Promise<UserModal> {
    const data = await adminUserApi.changeTheStatusOfUser(userId);
    return userResponseToModal(data.data);
  }

  async updateRole(userId: string): Promise<UserModal> {
    const data = await adminUserApi.changeTheRoleOfUser(userId);

    return userResponseToModal(data.data);
  }
}
