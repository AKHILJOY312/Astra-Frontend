import type { PlanRepository } from "@/application/repo/PlanRepository";
import { TYPES } from "@/di/types";
import { inject, injectable } from "inversify";

export interface PlanLimits {
  maxProjects: number;
  maxMembersPerProject: number;
  currentProjects: number;
  planName: string;
}
@injectable()
export class GetPlanLimitsUseCase {
  constructor(@inject(TYPES.PlanRepository) private planRepo: PlanRepository) {}

  async execute(): Promise<PlanLimits> {
    return await this.planRepo.getLimits();
  }
}
