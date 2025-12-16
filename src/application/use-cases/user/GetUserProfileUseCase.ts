import type {
  IUserProfile,
  IUserRepository,
} from "@/application/repo/IUserRepository";
import { TYPES } from "@/di/types";

import { inject, injectable } from "inversify";

@injectable()
export class GetUserProfileUseCase {
  constructor(
    @inject(TYPES.IUserRepository)
    private UserRepo: IUserRepository
  ) {}

  async execute(): Promise<IUserProfile> {
    const result = await this.UserRepo.getProfile();

    return result;
  }
}
