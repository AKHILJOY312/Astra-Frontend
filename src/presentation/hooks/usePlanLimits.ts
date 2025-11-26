// src/presentation/hooks/usePlanLimits.ts
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { container } from "../../di/container";
import { TYPES } from "../../di/types";
import {
  GetPlanLimitsUseCase,
  GetCurrentPlanUseCase,
} from "../../application/use-cases/plan";
import type { RootState, AppDispatch } from "../redux/store/store";
import { openUpgradePlanModal } from "../redux/slice/uiSlice";
import { setPlanLimits } from "../redux/slice/projectSlice";

const getPlanLimitsUC = container.get<GetPlanLimitsUseCase>(
  TYPES.GetPlanLimitsUseCase
);
const getCurrentPlanUC = container.get<GetCurrentPlanUseCase>(
  TYPES.GetCurrentPlanUseCase
);

export const usePlanLimits = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { projects, limits } = useSelector((state: RootState) => state.project);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPlanData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [limitsData, planData] = await Promise.all([
        getPlanLimitsUC.execute(),
        getCurrentPlanUC.execute(),
      ]);

      dispatch(setPlanLimits({ limits: limitsData, currentPlan: planData }));

      // Auto-open upgrade modal if user has reached limit
      if (limitsData.currentProjects >= limitsData.maxProjects) {
        dispatch(openUpgradePlanModal());
      }
    } catch (err: any) {
      setError(err.message || "Failed to load plan limits");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlanData();
  }, []);

  // re-check on projects change
  useEffect(() => {
    if (limits && projects.length >= limits.maxProjects) {
      dispatch(openUpgradePlanModal());
    }
  }, [projects.length, limits, dispatch]);

  const hasReachedProjectLimit = limits
    ? projects.length >= limits.maxProjects
    : false;
  const hasReachedMemberLimit = (membersCount: number) =>
    limits ? membersCount >= limits.maxMembersPerProject : false;

  return {
    limits,
    loading,
    error,
    hasReachedProjectLimit,
    hasReachedMemberLimit,
    refresh: loadPlanData,
  };
};
