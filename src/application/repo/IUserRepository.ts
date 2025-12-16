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
export interface IUserRepository {
  getProfile(): Promise<IUserProfile>;
}
