import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { container, TYPES } from "@/di/container";
import type { IUserProfile } from "@/application/repo/IUserRepository";
import * as userApi from "@/data/api/userApi";
import { GetUserProfileUseCase } from "@/application/use-cases/user/GetUserProfileUseCase";

/* =========================
   Types & Interfaces
========================= */

interface UserState {
  profile: IUserProfile | null;
  loading: boolean;
  error: string | null;
}

// Define the shape of your API error
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const initialState: UserState = {
  profile: null,
  loading: false,
  error: null,
};

/* =========================
   UseCase Resolution
========================= */

const getUserProfileUC = container.get<GetUserProfileUseCase>(
  TYPES.GetUserProfileUseCase
);

/* =========================
   Thunks
========================= */

export const fetchUserProfile = createAsyncThunk<
  IUserProfile, // Return type
  void, // Argument type
  { rejectValue: string } // Config for rejectWithValue
>("user/fetchProfile", async (_, { rejectWithValue }) => {
  try {
    return await getUserProfileUC.execute();
  } catch (e) {
    const error = e as ApiError;
    return rejectWithValue(
      error.response?.data?.message || "Failed to load profile"
    );
  }
});

export const updateUserProfile = createAsyncThunk<
  { name: string; email: string }, // Adjust this based on your API return
  { name: string; email: string },
  { rejectValue: string }
>("user/updateProfile", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await userApi.updateProfile(payload);
    return data.user;
  } catch (e) {
    const error = e as ApiError;
    return rejectWithValue(
      error.response?.data?.message || "Profile update failed"
    );
  }
});

export const uploadProfileImage = createAsyncThunk<
  string, // Returns the imageUrl string
  File,
  { rejectValue: string }
>("user/uploadProfileImage", async (file, { rejectWithValue }) => {
  try {
    // Step 1: get signed URL
    const { data } = await userApi.getUploadUrl(file.type);
    const { uploadUrl, imageUrl } = data;

    // Step 2: upload to S3
    await fetch(uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    });

    // Step 3: save image URL
    await userApi.saveProfileImage(imageUrl);

    return imageUrl;
  } catch (e) {
    const error = e as ApiError;
    return rejectWithValue(
      error.response?.data?.message || "Image upload failed"
    );
  }
});

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
        state.profile = action.payload; // action.payload is now typed as IUserProfile
        state.loading = false;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      })

      /* -------- Update Profile -------- */
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        if (state.profile) {
          state.profile.name = action.payload.name;
          state.profile.email = action.payload.email;
        }
        state.loading = false;
      })

      /* -------- Upload Image -------- */
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        if (state.profile) {
          state.profile.imageUrl = action.payload;
        }
        state.loading = false;
      });
    // (Rejected cases follow the same pattern as fetchUserProfile)
  },
});

export const { clearUserError } = userSlice.actions;
export default userSlice.reducer;
