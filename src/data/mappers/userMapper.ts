// src/data/mappers/userMapper.ts
import type { UserResponseDTO } from "@/application/repo/IUserRepository";
import type { User, UserModal } from "../../domain/entities/user/User";

export const userResponseToEntity = (raw: UserResponseDTO): User => ({
  id: raw.id ?? raw._id!,
  name: raw.name,
  email: raw.email,
  isAdmin: raw.isAdmin,
});

export const userResponseToModal = (raw: UserResponseDTO): UserModal => ({
  id: raw.id ?? raw._id!,
  name: raw.name,
  email: raw.email,
  isAdmin: raw.isAdmin,

  isBlocked: raw.status !== "active",
  status: raw.status,

  isVerified: raw.isVerified,
  createdAt: raw.createdAt,
  image: raw.image ?? null,
});
