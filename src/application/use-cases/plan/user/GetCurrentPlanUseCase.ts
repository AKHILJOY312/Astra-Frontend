import type { PlanRepository } from "@/application/repo/PlanRepository";
import { TYPES } from "@/di/types";
import type { Plan } from "@/domain/types/index.";
import { inject, injectable } from "inversify";
@injectable()
export class GetCurrentPlanUseCase {
  constructor(@inject(TYPES.PlanRepository) private planRepo: PlanRepository) {}

  async execute(): Promise<Plan> {
    const plan = await this.planRepo.getCurrentPlan();
    if (!plan) throw new Error("No active plan found");
    return plan;
  }
}
