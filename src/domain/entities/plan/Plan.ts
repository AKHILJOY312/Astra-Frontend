// src/domain/entities/plan/Plan.ts
export interface Plan {
  _id: string;
  id: string;
  name: string;
  description: string;
  price: number;
  finalAmount: number;
  currency: "INR" | "USD" | "EUR";
  billingCycle: "monthly" | "yearly";
  features: string[];
  maxProjects: number;
  maxMembersPerProject: number;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

// // src/domain/entities/Plan.ts
// export interface PlanProps {
//   id: string;                    // "free" | "premium_monthly" | etc.
//   name: string;
//   description: string;
//   price: number;
//   finalAmount: number;
//   currency: "USD" | "INR" | "EUR";
//   billingCycle: "monthly" | "yearly";
//   features: string[];
//   maxProjects: number;
//   maxMembersPerProject: number;
//   isActive: boolean;
//   isDeleted: boolean;
//   createdAt?: string;
//   updatedAt?: string;
// }

// export class Plan {
//   private readonly props: PlanProps;

//   constructor(props: PlanProps) {
//     this.props = { ...props };
//   }

//   get id() { return this.props.id; }
//   get name() { return this.props.name; }
//   get description() { return this.props.description; }
//   get price() { return this.props.price; }
//   get finalAmount() { return this.props.finalAmount; }
//   get currency() { return this.props.currency; }
//   get billingCycle() { return this.props.billingCycle; }
//   get features() { return this.props.features; }
//   get maxProjects() { return this.props.maxProjects; }
//   get maxMembersPerProject() { return this.props.maxMembersPerProject; }
//   get isActive() { return this.props.isActive; }

//   toJSON() {
//     return { ...this.props };
//   }
// }
