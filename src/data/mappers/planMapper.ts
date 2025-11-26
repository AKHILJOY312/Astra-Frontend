import type { Plan } from "@/domain/entities/plan/Plan";

export const planResponseToEntity = (raw: any): Plan => ({
  _id: raw._id,
  id: raw.id,
  name: raw.name,
  description: raw.description ?? "",
  price: raw.price,
  finalAmount: raw.finalAmount,
  currency: raw.currency,
  billingCycle: raw.billingCycle,
  features: raw.features ?? [],
  maxProjects: raw.maxProjects,
  maxMembersPerProject: raw.maxMembersPerProject,
  isActive: raw.isActive,
  isDeleted: raw.isDeleted,
  createdAt: raw.createdAt,
  updatedAt: raw.updatedAt,
});
