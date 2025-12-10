// src/data/api/authApi.ts
import api from "../../lib/apicaller";

export const getAllUserForAdmin = (
  page: number,
  limit: number,
  search?: string
) => api.get("/admin/users", { params: { page, limit, search } });

export const changeTheStatusOfUser = (id: string) =>
  api.patch(`/admin/users/${id}/status`);

export const changeTheRoleOfUser = (id: string) =>
  api.patch(`/admin/users/${id}/role`);
