import type { VerifyPaymentDTO } from "@/application/repo/IUserSubscriptionRepository";
import apiCaller from "@/lib/apicaller";

export const createRazorpayOrder = (planId: string) =>
  apiCaller.post("/subscription/razorpay/order", { planId });

export const verifyPayment = (payload: VerifyPaymentDTO) =>
  apiCaller.post("/subscription/razorpay/capture", payload);
