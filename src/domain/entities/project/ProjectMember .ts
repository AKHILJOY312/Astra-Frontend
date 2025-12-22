// src/domain/entities/project/ProjectMember.ts
export interface ProjectMember {
  id: string;
  role: "manager" | "lead" | "member";
  joinedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
