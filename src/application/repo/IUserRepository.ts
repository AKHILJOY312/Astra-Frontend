export interface IProfilePlan {
  planType: string;
  amount: number;
  currency: string;
  status: string;
  endDate: Date;
}

export interface IUserProfile {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  isVerified: boolean;
  createdAt: Date;
  plan: IProfilePlan | null;
}

export interface UserResponseDTO {
  id?: string;
  _id?: string;

  name: string;
  email: string;

  isAdmin: boolean;
  isVerified: boolean;

  status: "active" | "blocked";
  image?: string | null;

  createdAt: Date | undefined;
}
export interface IUserRepository {
  getProfile(): Promise<IUserProfile>;
}
