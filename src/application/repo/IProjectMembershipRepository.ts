// src/application/repo/ProjectMembershipRepository.ts
import type { ProjectMember } from "@/domain/entities/project/ProjectMember ";
import { ProjectMembership } from "../../domain/entities/project/ProjectMembership";

export interface IProjectMembershipRepository {
  addMember(
    projectId: string,
    email: string,
    role: string
  ): Promise<ProjectMembership>;
  getMembers(projectId: string): Promise<ProjectMember[]>;
}
