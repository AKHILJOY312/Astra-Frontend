// src/application/use-cases/project/ListUserProjectsUseCase.ts
import type { ProjectRepository } from "@/application/repo/ProjectRepository";
import { TYPES } from "@/di/types";
import type { Project } from "@/domain/types/index.";
import { inject, injectable } from "inversify";
@injectable()
export class ListUserProjectsUseCase {
  constructor(
    @inject(TYPES.ProjectRepository) private projectRepo: ProjectRepository
  ) {}

  async execute(): Promise<Project[]> {
    return await this.projectRepo.getUserProjects();
  }
}
