// src/di/types.ts
export const TYPES = {
  AuthRepository: Symbol.for("AuthRepository"),
  PlanRepository: Symbol.for("PlanRepository"),
  ProjectRepository: Symbol.for("ProjectRepository"),
  ProjectMembershipRepository: Symbol.for("ProjectMembershipRepository"),
  ChannelRepository: Symbol.for("ChannelRepository"),

  //   // Use Cases
  //   LoginUseCase: Symbol.for("LoginUseCase"),
  //   RegisterUseCase: Symbol.for("RegisterUseCase"),
  //   LoadUserUseCase: Symbol.for("LoadUserUseCase"),
  //   LogoutUseCase: Symbol.for("LogoutUseCase"),
  //   ForgotPasswordUseCase: Symbol.for("ForgotPasswordUseCase"),
  //   ResetPasswordUseCase: Symbol.for("ResetPasswordUseCase"),
  //   VerifyEmailUseCase: Symbol.for("VerifyEmailUseCase"),

  // Auth use cases
  LoginUseCase: Symbol.for("LoginUseCase"),
  RegisterUseCase: Symbol.for("RegisterUseCase"),
  LoadUserUseCase: Symbol.for("LoadUserUseCase"),
  LogoutUseCase: Symbol.for("LogoutUseCase"),
  ForgotPasswordUseCase: Symbol.for("ForgotPasswordUseCase"),
  ResetPasswordUseCase: Symbol.for("ResetPasswordUseCase"),
  VerifyEmailUseCase: Symbol.for("VerifyEmailUseCase"),

  // Project
  CreateProjectUseCase: Symbol.for("CreateProjectUseCase"),
  ListUserProjectsUseCase: Symbol.for("ListUserProjectsUseCase"),
  GetProjectByIdUseCase: Symbol.for("GetProjectByIdUseCase"),

  // Members
  AddMemberUseCase: Symbol.for("AddMemberUseCase"),
  GetProjectMembersUseCase: Symbol.for("GetProjectMembersUseCase"),

  // Plan
  GetCurrentPlanUseCase: Symbol.for("GetCurrentPlanUseCase"),
  GetPlansUseCase: Symbol.for("GetPlansUseCase"),
  CreatePlanUseCase: Symbol.for("CreatePlanUseCase"),
  UpdatePlanUseCase: Symbol.for("UpdatePlanUseCase"),
  DeletePlanUseCase: Symbol.for("DeletePlanUseCase"),
  GetPlanLimitsUseCase: Symbol.for("GetPlanLimitsUseCase"),
  UpgradePlanUseCase: Symbol.for("UpgradePlanUseCase"),

  // Channels
  CreateChannelUseCase: Symbol.for("CreateChannelUseCase"),
  ListChannelsUseCase: Symbol.for("ListChannelsUseCase"),

  // CreateProjectUseCase: Symbol.for("CreateProjectUseCase"),
  // ListUserProjectsUseCase: Symbol.for("ListUserProjectsUseCase"),
  //   GetProjectByIdUseCase: Symbol.for("GetProjectByIdUseCase"),

  // AddMemberUseCase: Symbol.for("AddMemberUseCase"),
  //   GetProjectMembersUseCase: Symbol.for("GetProjectMembersUseCase"),

  // GetCurrentPlanUseCase: Symbol.for("GetCurrentPlanUseCase"),
  //   GetAvailablePlansUseCase: Symbol.for("GetAvailablePlansUseCase"),
  //   UpgradePlanUseCase: Symbol.for("UpgradePlanUseCase"),
  // GetPlanLimitsUseCase: Symbol.for("GetPlanLimitsUseCase"),

  // CreateChannelUseCase: Symbol.for("CreateChannelUseCase"),
  //   ListChannelsUseCase: Symbol.for("ListChannelsUseCase"),
  //   DeleteChannelUseCase: Symbol.for("DeleteChannelUseCase"),
} as const;
