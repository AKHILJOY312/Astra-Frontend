export interface VerifyPaymentDTO {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export interface IUserSubscriptionRepository {
  createPendingSubscription(data: {
    planId: string;
    orderId: string;
    amount: number;
    currency: string;
  }): Promise<void>;

  activateSubscriptionFromOrder(
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string
  ): Promise<void>;
}
