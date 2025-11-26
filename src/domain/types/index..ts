// src/domain/types/index.ts
// Re-export for easy import
export * from "../entities/project/Project";
export * from "../entities/project/ProjectMembership";
export * from "../entities/plan/Plan";

export type ProjectRole = "member" | "lead" | "manager";
