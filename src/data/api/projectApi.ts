// src/data/api/projectApi.ts
import api from "../../lib/apicaller";

export const createProject = (payload: {
  projectName: string;
  description?: string;
  imageUrl?: string | null;
}) => api.post("/projects", payload);

export const getUserProjects = () => api.get("/projects/me");

export const getProjectById = (projectId: string) =>
  api.get(`/projects/${projectId}`);

export const deleteProject = (projectId: string) =>
  api.delete(`/projects/${projectId}`);

export const upgradePlan = (planId: string) =>
  api.post("/subscription/upgrade", { planId });
