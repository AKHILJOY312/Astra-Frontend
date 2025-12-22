// src/presentation/redux/thunks/authThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { container, TYPES } from "../../../di/container";
import { tokenService } from "@/lib/tokenService";

import {
  LoginUseCase,
  RegisterUseCase,
  LoadUserUseCase,
  LogoutUseCase,
  ForgotPasswordUseCase,
  ResetPasswordUseCase,
  VerifyEmailUseCase,
} from "../../../application/use-cases/auth/index";

// Define a base error interface to replace 'any'
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

// Resolve singletons
const loginUC = container.get<LoginUseCase>(TYPES.LoginUseCase);
const registerUC = container.get<RegisterUseCase>(TYPES.RegisterUseCase);
const loadUserUC = container.get<LoadUserUseCase>(TYPES.LoadUserUseCase);
const logoutUC = container.get<LogoutUseCase>(TYPES.LogoutUseCase);
const forgotUC = container.get<ForgotPasswordUseCase>(
  TYPES.ForgotPasswordUseCase
);
const resetUC = container.get<ResetPasswordUseCase>(TYPES.ResetPasswordUseCase);
const verifyUC = container.get<VerifyEmailUseCase>(TYPES.VerifyEmailUseCase);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string; isAdminLogin?: boolean },
    { rejectWithValue }
  ) => {
    try {
      return await loginUC.execute(credentials);
    } catch (e) {
      const error = e as ApiError;
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      return await loadUserUC.execute();
    } catch (e) {
      const error = e as ApiError;
      return rejectWithValue(
        error.response?.data?.message || "Not authenticated"
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    data: {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    },
    { rejectWithValue }
  ) => {
    try {
      return await registerUC.execute(data);
    } catch (e) {
      const error = e as ApiError;
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutUC.execute();
    } catch (e) {
      const error = e as ApiError;
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      return await forgotUC.execute(email);
    } catch (e) {
      const error = e as ApiError;
      return rejectWithValue(error.response?.data?.message || "Error occurred");
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (
    { token, password }: { token: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      return await resetUC.execute(token, password);
    } catch (e) {
      const error = e as ApiError;
      return rejectWithValue(
        error.response?.data?.message || "Failed to reset password"
      );
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (token: string, { rejectWithValue }) => {
    try {
      return await verifyUC.execute(token);
    } catch (e) {
      const error = e as ApiError;
      return rejectWithValue(
        error.response?.data?.message || "Verification failed"
      );
    }
  }
);

export const loginSuccess = createAsyncThunk(
  "auth/loginSuccess",
  async (data: { token: string }) => {
    tokenService.setToken(data.token);
    return { token: data.token };
  }
);
