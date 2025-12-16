import * as userApi from "../api/userApi";
import type {
  IUserProfile,
  IUserRepository,
} from "@/application/repo/IUserRepository";

export class UserRepositoryImpl implements IUserRepository {
  async getProfile(): Promise<IUserProfile> {
    const response = await userApi.getMyProfile();
    return response.data;
  }
}
