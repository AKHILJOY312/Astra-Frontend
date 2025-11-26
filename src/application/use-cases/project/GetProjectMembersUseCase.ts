import type { ProjectMembershipRepository } from "@/application/repo/ProjectMembershipRepository";
import { TYPES } from "@/di/types";
import type { ProjectMembership } from "@/domain/types/index.";
import { inject, injectable } from "inversify";
@injectable()
export class GetProjectMembersUseCase {
  constructor(
    @inject(TYPES.ProjectMembershipRepository)
    private membershipRepo: ProjectMembershipRepository
  ) {}

  async execute(projectId: string): Promise<ProjectMembership[]> {
    return await this.membershipRepo.getMembers(projectId);
  }
}
