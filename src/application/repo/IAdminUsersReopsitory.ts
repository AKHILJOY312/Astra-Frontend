import type { UserModal } from "@/domain/entities/user/User";
export interface AdminUserListResult {
  users: UserModal[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
export interface IAdminUsersRepository {
  listUsers(
    page: number,
    limit: number,
    search: string
  ): Promise<AdminUserListResult>;

  blockUser(userId: string): Promise<UserModal>;
  updateRole(userId: string): Promise<UserModal>;
}
