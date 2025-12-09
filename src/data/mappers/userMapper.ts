// src/data/mappers/userMapper.ts
import type { User, UserModal } from "../../domain/entities/user/User";

export const userResponseToEntity = (raw: any): User => ({
  id: raw.id,
  name: raw.name,
  email: raw.email,
  isAdmin: raw.isAdmin,
});

export const userResponseToModal = (raw: any): UserModal => ({
  id: raw.id,
  name: raw.name,
  email: raw.email,
  isAdmin: raw.isAdmin,
  isBlocked: raw.status === "active" ? false : true,
  createdAt: raw.createdAt,
  isVerified: raw.isVerified,
  status: raw.status,
  image: raw.image,
});
