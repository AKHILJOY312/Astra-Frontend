// src/application/repo/ProjectRepository.ts
import { Project } from "../../domain/entities/project/Project";
import type { CreateProjectDTO } from "../use-cases/index";

export interface ProjectRepository {
  create(dto: CreateProjectDTO): Promise<Project>;
  getUserProjects(): Promise<Project[]>;
  getById(id: string): Promise<Project | null>;
}
