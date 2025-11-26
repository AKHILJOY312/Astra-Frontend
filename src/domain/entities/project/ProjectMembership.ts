export type ProjectRole = "member" | "lead" | "manager";

export interface ProjectMembershipProps {
  id?: string;
  projectId: string;
  userId: string;
  role: ProjectRole;
  joinedAt: string; // ISO
  createdAt?: string;
  updatedAt?: string;
}

export class ProjectMembership {
  private readonly _id?: string;
  private readonly _projectId: string;
  private readonly _userId: string;
  private readonly _role: ProjectRole;
  private readonly _joinedAt: Date;
  private readonly _createdAt: Date;
  private readonly _updatedAt: Date;

  constructor(props: ProjectMembershipProps) {
    this._id = props.id;
    this._projectId = props.projectId;
    this._userId = props.userId;
    this._role = props.role;
    this._joinedAt = new Date(props.joinedAt);
    this._createdAt = props.createdAt ? new Date(props.createdAt) : new Date();
    this._updatedAt = props.updatedAt ? new Date(props.updatedAt) : new Date();
  }

  get id() {
    return this._id;
  }
  get projectId() {
    return this._projectId;
  }
  get userId() {
    return this._userId;
  }
  get role() {
    return this._role;
  }
  get joinedAt() {
    return this._joinedAt;
  }

  get isManager() {
    return this._role === "manager";
  }
  get isLead() {
    return this._role === "lead";
  }
  get isMember() {
    return this._role === "member";
  }

  toJSON() {
    return {
      id: this._id,
      projectId: this._projectId,
      userId: this._userId,
      role: this._role,
      joinedAt: this._joinedAt.toISOString(),
      createdAt: this._createdAt.toISOString(),
      updatedAt: this._updatedAt.toISOString(),
    };
  }
}
