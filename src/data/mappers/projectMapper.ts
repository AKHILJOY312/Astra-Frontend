// src/data/mappers/projectMapper.ts
import { Project } from "../../domain/entities/project/Project";

export const projectResponseToEntity = (raw: any): Project => {
  return new Project({
    id: raw._id || raw.id, // backend may send _id
    projectName: raw.projectName,
    description: raw.description ?? "",
    imageUrl: raw.imageUrl ?? null,
    ownerId: raw.ownerId,
    createdAt: raw.createdAt, // string -> Date inside constructor
    updatedAt: raw.updatedAt,
  });
};
