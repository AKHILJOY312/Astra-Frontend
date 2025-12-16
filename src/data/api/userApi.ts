import api from "@/lib/apicaller";

export const getMyProfile = () => api.get("/users/me");

export const updateProfile = (payload: { name: string; email: string }) =>
  api.patch("/users/me", payload);

export const deleteAccount = () => api.delete("/users/me");

export const getUploadUrl = (fileType: string) =>
  api.post("/users/me/profile-image/upload-url", { fileType });

export const saveProfileImage = (imageUrl: string) =>
  api.patch("/users/me/profile-image", { imageUrl });
