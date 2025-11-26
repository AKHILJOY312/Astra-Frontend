// src/data/api/membershipApi.ts
import api from "../../lib/apicaller";

export const addMember = (
  projectId: string,
  payload: { userEmail: string; role?: "member" | "lead" | "manager" }
) => api.post(`/projects/${projectId}/members`, payload);

export const getProjectMembers = (projectId: string) =>
  api.get(`/projects/${projectId}/members`);

export const removeMember = (projectId: string, memberId: string) =>
  api.delete(`/projects/${projectId}/members/${memberId}`);

export const changeMemberRole = (
  projectId: string,
  memberId: string,
  role: "member" | "lead" | "manager"
) => api.patch(`/projects/${projectId}/members/${memberId}/role`, { role });
