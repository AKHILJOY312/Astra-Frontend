// src/presentation/pages/user/UpgradePlanPage.tsx
import { Check, Sparkles } from "lucide-react";
import { useRazorpay } from "@/presentation/hooks/useRazorpay";
import { useSelector } from "react-redux";
import type { RootState } from "@/presentation/redux/store/store";

const plans = [
  {
    id: "pro_monthly",
    name: "Pro",
    price: "₹799",
    billing: "/month",
    desc: "Perfect for growing teams",
    features: [
      "Unlimited projects",
      "50 members per project",
      "Priority support",
      "Advanced analytics",
    ],
  },
  {
    id: "team_yearly",
    name: "Team",
    price: "₹1,599",
    billing: "/month (billed yearly)",
    desc: "Best value — save 33%",
    popular: true,
    features: [
      "Everything in Pro",
      "200 members per project",
      "SSO + SAML",
      "Dedicated manager",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    billing: "",
    desc: "For large organizations",
    features: [
      "Unlimited everything",
      "Custom integrations",
      "24/7 phone support",
      "SLA + uptime guarantee",
    ],
  },
];

export default function UpgradePlanPage() {
  const { initiatePayment } = useRazorpay();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950 py-20 px-4">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Choose Your Plan
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Unlock unlimited projects, members, and advanced features
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`
              relative rounded-3xl p-8 transition-all hover:scale-105
              ${
                plan.popular
                  ? "bg-gradient-to-br from-blue-600 to-purple-700 text-white shadow-2xl"
                  : "bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700"
              }
            `}
          >
            {plan.popular && (
              <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                <span className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  MOST POPULAR
                </span>
              </div>
            )}

            <div className="text-center mb-8">
              <h3
                className={`text-3xl font-bold ${
                  plan.popular ? "text-white" : "text-gray-900 dark:text-white"
                }`}
              >
                {plan.name}
              </h3>
              <div className="mt-6">
                <span className="text-5xl font-bold">{plan.price}</span>
                {plan.billing && (
                  <span className="text-lg opacity-80">{plan.billing}</span>
                )}
              </div>
              <p
                className={`mt-4 ${
                  plan.popular
                    ? "text-white/90"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                {plan.desc}
              </p>
            </div>

            <ul className="space-y-4 mb-10">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Check
                    className={`w-6 h-6 ${
                      plan.popular ? "text-yellow-300" : "text-green-600"
                    }`}
                  />
                  <span
                    className={
                      plan.popular
                        ? "text-white"
                        : "text-gray-700 dark:text-gray-300"
                    }
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={() =>
                plan.price !== "Custom" && initiatePayment(plan.id)
              }
              className={`
                w-full py-4 rounded-2xl font-bold text-lg transition-all
                ${
                  plan.popular
                    ? "bg-white text-blue-600 hover:bg-gray-100"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }
              `}
            >
              {plan.price === "Custom" ? "Contact Sales" : "Upgrade Now"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
