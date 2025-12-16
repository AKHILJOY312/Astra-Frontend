import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { container, TYPES } from "@/di/container";
import type { IUserProfile } from "@/application/repo/IUserRepository";
import { UserRepositoryImpl } from "@/data/repo/UserRepositoryImpl";
import * as userApi from "@/data/api/userApi";
import { GetUserProfileUseCase } from "@/application/use-cases/user/GetUserProfileUseCase";

/* =========================
   State
========================= */

interface UserState {
  profile: IUserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  loading: false,
  error: null,
};

/* =========================
   UseCase / Repository
========================= */

const userRepo = container.get<UserRepositoryImpl>(TYPES.IUserRepository);
const getUserProfileUC = container.get<GetUserProfileUseCase>(
  TYPES.GetUserProfileUseCase
);

/* =========================
   Thunks
========================= */

// 1️⃣ Fetch profile
export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      return await getUserProfileUC.execute();
    } catch (e: any) {
      return rejectWithValue(
        e.response?.data?.message || "Failed to load profile"
      );
    }
  }
);

// 2️⃣ Update name & email
export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (payload: { name: string; email: string }, { rejectWithValue }) => {
    try {
      const { data } = await userApi.updateProfile(payload);
      return data.user;
    } catch (e: any) {
      return rejectWithValue(
        e.response?.data?.message || "Profile update failed"
      );
    }
  }
);

// 3️⃣ Upload profile image (S3)
export const uploadProfileImage = createAsyncThunk(
  "user/uploadProfileImage",
  async (file: File, { rejectWithValue }) => {
    try {
      // Step 1: get signed URL
      const { data } = await userApi.getUploadUrl(file.type);
      const { uploadUrl, imageUrl } = data;

      // Step 2: upload to S3
      await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      // Step 3: save image URL
      await userApi.saveProfileImage(imageUrl);

      return imageUrl;
    } catch (e: any) {
      return rejectWithValue(
        e.response?.data?.message || "Image upload failed"
      );
    }
  }
);

/* =========================
   Slice
========================= */

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* -------- Fetch Profile -------- */
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* -------- Update Profile -------- */
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        if (state.profile) {
          state.profile.name = action.payload.name;
          state.profile.email = action.payload.email;
        }
        state.loading = false;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* -------- Upload Image -------- */
      .addCase(uploadProfileImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        if (state.profile) {
          state.profile.imageUrl = action.payload;
        }
        state.loading = false;
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

/* =========================
   Exports
========================= */

export const { clearUserError } = userSlice.actions;
export default userSlice.reducer;
