// src/di/container.ts
import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";

import type { AuthRepository } from "../application/repo/AuthRepository";
import { AuthRepositoryImpl } from "../data/repo/AuthRepositoryImpl";
import { PlanRepositoryImpl } from "@/data/repo/PlanRepositoryImpl";

import {
  LoginUseCase,
  RegisterUseCase,
  LoadUserUseCase,
  LogoutUseCase,
  ForgotPasswordUseCase,
  ResetPasswordUseCase,
  VerifyEmailUseCase,
} from "../application/use-cases/auth";
import {
  GetPlansUseCase,
  CreatePlanUseCase,
  UpdatePlanUseCase,
  DeletePlanUseCase,
  GetCurrentPlanUseCase,
  GetPlanLimitsUseCase,
} from "@/application/use-cases/plan";
import type { ProjectRepository } from "@/application/repo/ProjectRepository";
import { ProjectRepositoryImpl } from "@/data/repo/ProjectRepositoryImpl";
import type { ProjectMembershipRepository } from "@/application/repo/ProjectMembershipRepository";
import { ProjectMembershipRepositoryImpl } from "@/data/repo/ProjectMembershipRepositoryImpl";
import type { ChannelRepository } from "@/application/repo/ChannelRepository";
import { ChannelRepositoryImpl } from "@/data/repo/ChannelRepositoryImpl";
import {
  AddMemberUseCase,
  CreateProjectUseCase,
  GetProjectByIdUseCase,
  GetProjectMembersUseCase,
  ListChannelsUseCase,
  ListUserProjectsUseCase,
} from "@/application/use-cases";
import { CreateChannelUseCase } from "@/application/use-cases/channel/CreateChannelUseCase";
import { UpgradePlanUseCase } from "@/application/use-cases/upgradeplan/UpgradePlanUseCase";

const container = new Container();

// ───── Repository ───────────────────────────────────────
container
  .bind<AuthRepository>(TYPES.AuthRepository) // ← generic = interface type
  .to(AuthRepositoryImpl)
  .inSingletonScope();

container.bind(TYPES.PlanRepository).to(PlanRepositoryImpl).inSingletonScope();

container
  .bind<ProjectRepository>(TYPES.ProjectRepository)
  .to(ProjectRepositoryImpl)
  .inSingletonScope();

container
  .bind<ProjectMembershipRepository>(TYPES.ProjectMembershipRepository)
  .to(ProjectMembershipRepositoryImpl)
  .inSingletonScope();

container
  .bind<ChannelRepository>(TYPES.ChannelRepository)
  .to(ChannelRepositoryImpl)
  .inSingletonScope();

// ───── Use‑cases ────────────────────────────────────────
// Auth use cases
container
  .bind<LoginUseCase>(TYPES.LoginUseCase)
  .to(LoginUseCase)
  .inTransientScope();
container
  .bind<RegisterUseCase>(TYPES.RegisterUseCase)
  .to(RegisterUseCase)
  .inTransientScope();
container
  .bind<LoadUserUseCase>(TYPES.LoadUserUseCase)
  .to(LoadUserUseCase)
  .inTransientScope();
container
  .bind<LogoutUseCase>(TYPES.LogoutUseCase)
  .to(LogoutUseCase)
  .inTransientScope();
container
  .bind<ForgotPasswordUseCase>(TYPES.ForgotPasswordUseCase)
  .to(ForgotPasswordUseCase)
  .inTransientScope();
container
  .bind<ResetPasswordUseCase>(TYPES.ResetPasswordUseCase)
  .to(ResetPasswordUseCase)
  .inTransientScope();
container
  .bind<VerifyEmailUseCase>(TYPES.VerifyEmailUseCase)
  .to(VerifyEmailUseCase)
  .inTransientScope();

// Plan use cases
container
  .bind<GetPlansUseCase>(TYPES.GetPlansUseCase)
  .to(GetPlansUseCase)
  .inTransientScope();
container
  .bind<CreatePlanUseCase>(TYPES.CreatePlanUseCase)
  .to(CreatePlanUseCase)
  .inTransientScope();
container
  .bind<UpdatePlanUseCase>(TYPES.UpdatePlanUseCase)
  .to(UpdatePlanUseCase)
  .inTransientScope();
container
  .bind<DeletePlanUseCase>(TYPES.DeletePlanUseCase)
  .to(DeletePlanUseCase)
  .inTransientScope();
container
  .bind<GetCurrentPlanUseCase>(TYPES.GetCurrentPlanUseCase)
  .to(GetCurrentPlanUseCase)
  .inTransientScope();
container
  .bind<GetPlanLimitsUseCase>(TYPES.GetPlanLimitsUseCase)
  .to(GetPlanLimitsUseCase)
  .inTransientScope();
container
  .bind<UpgradePlanUseCase>(TYPES.UpgradePlanUseCase)
  .to(UpgradePlanUseCase);
// container.bind(GetAvailablePlansUseCase).toSelf().inTransientScope();

// Project use cases
container
  .bind<CreateProjectUseCase>(TYPES.CreateProjectUseCase)
  .to(CreateProjectUseCase)
  .inTransientScope();
container
  .bind<ListUserProjectsUseCase>(TYPES.ListUserProjectsUseCase)
  .to(ListUserProjectsUseCase)
  .inTransientScope();
container
  .bind<GetProjectByIdUseCase>(TYPES.GetProjectByIdUseCase)
  .to(GetProjectByIdUseCase)
  .inTransientScope();

// Membership use cases
container
  .bind<AddMemberUseCase>(TYPES.AddMemberUseCase)
  .to(AddMemberUseCase)
  .inTransientScope();
container
  .bind<GetProjectMembersUseCase>(TYPES.GetProjectMembersUseCase)
  .to(GetProjectMembersUseCase)
  .inTransientScope();

// ──────── Channel Use Cases ────────
// Channels
container
  .bind<CreateChannelUseCase>(TYPES.CreateChannelUseCase)
  .to(CreateChannelUseCase)
  .inTransientScope();
container
  .bind<ListChannelsUseCase>(TYPES.ListChannelsUseCase)
  .to(ListChannelsUseCase)
  .inTransientScope();

export { container, TYPES };
