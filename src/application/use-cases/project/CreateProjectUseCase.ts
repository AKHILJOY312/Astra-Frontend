import type { ProjectRepository } from "@/application/repo/ProjectRepository";
import { TYPES } from "@/di/types";
import type { Project } from "@/domain/types/index.";
import { inject, injectable } from "inversify";

export interface CreateProjectDTO {
  projectName: string;
  description?: string;
  imageUrl?: string | null;
}
@injectable()
export class CreateProjectUseCase {
  constructor(
    @inject(TYPES.ProjectRepository) private projectRepo: ProjectRepository
  ) {}

  async execute(dto: CreateProjectDTO): Promise<Project> {
    const project = await this.projectRepo.create(dto);
    return project;
  }
}
