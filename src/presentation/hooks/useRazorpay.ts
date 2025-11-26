// src/presentation/hooks/useRazorpay.ts
import { container } from "@/di/container";
import { TYPES } from "@/di/types";
import { UpgradePlanUseCase } from "@/application/use-cases/upgradeplan/UpgradePlanUseCase";

const upgradeUC = container.get<UpgradePlanUseCase>(TYPES.UpgradePlanUseCase);

interface RazorpayOrder {
  id: string;
  amount: number;
  currency: "INR";
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const useRazorpay = () => {
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const initiatePayment = async (planId: string) => {
    const loaded = await loadRazorpayScript();
    if (!loaded) throw new Error("Razorpay SDK failed to load");

    // Step 1: Create order via your backend
    const orderResponse = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/subscription/razorpay/order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ planId }),
      }
    );

    const order: RazorpayOrder = await orderResponse.json();

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY!,
      amount: order.amount,
      currency: order.currency,
      name: "Astra Workspace",
      description: `Upgrade to ${planId.replace("_", " ").toUpperCase()}`,
      order_id: order.id,
      handler: async (response: any) => {
        try {
          // Step 2: Verify payment
          await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/subscription/razorpay/verify`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            }
          );

          // Step 3: Upgrade plan via Clean Architecture
          await upgradeUC.execute({ planId });
          window.location.href = "/payment/success";
        } catch (err) {
          window.location.href = "/payment/failed";
        }
      },
      prefill: {
        name: "John Doe",
        email: "john@example.com",
      },
      theme: {
        color: "#3b82f6",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return { initiatePayment };
};
