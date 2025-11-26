// src/application/use-cases/project/GetProjectByIdUseCase.ts
import type { ProjectRepository } from "../../repo/ProjectRepository";
import { Project } from "../../../domain/entities/project/Project";
import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";
@injectable()
export class GetProjectByIdUseCase {
  constructor(
    @inject(TYPES.ProjectRepository) private projectRepo: ProjectRepository
  ) {}

  async execute(projectId: string): Promise<Project> {
    const project = await this.projectRepo.getById(projectId);
    if (!project) throw new Error("Project not found");
    return project;
  }
}
