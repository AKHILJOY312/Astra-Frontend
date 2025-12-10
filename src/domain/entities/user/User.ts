export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}
export interface UserModal extends User {
  isBlocked: boolean;
  createdAt: Date | undefined;
  isVerified: boolean;
  status: "active" | "blocked";
  image: string;
}
export interface AuthState {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
  message: string | null;
  isAuthenticated: boolean;
  role: "user" | "admin" | null;
}
