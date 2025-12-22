import type { ProjectResponseDTO } from "@/application/repo/IProjectRepository";
import { Project } from "../../domain/entities/project/Project";

export const projectResponseToEntity = (raw: ProjectResponseDTO): Project => {
  return new Project({
    id: raw.id,
    projectName: raw.projectName,
    description: raw.description ?? "",
    imageUrl: raw.imageUrl ?? null,
    ownerId: raw.ownerId,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  });
};
