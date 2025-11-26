// src/domain/entities/Project.ts
export interface ProjectProps {
  id: string;
  projectName: string;
  description: string;
  imageUrl: string | null;
  ownerId: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export class Project {
  private readonly _id: string;
  private readonly _projectName: string;
  private readonly _description: string;
  private readonly _imageUrl: string | null;
  private readonly _ownerId: string;
  private readonly _createdAt: Date;
  private readonly _updatedAt: Date;

  constructor(props: ProjectProps) {
    this._id = props.id;
    this._projectName = props.projectName;
    this._description = props.description;
    this._imageUrl = props.imageUrl;
    this._ownerId = props.ownerId;
    this._createdAt = new Date(props.createdAt);
    this._updatedAt = new Date(props.updatedAt);
  }

  get id() {
    return this._id;
  }
  get projectName() {
    return this._projectName;
  }
  get description() {
    return this._description;
  }
  get imageUrl() {
    return this._imageUrl;
  }
  get ownerId() {
    return this._ownerId;
  }
  get createdAt() {
    return this._createdAt;
  }
  get updatedAt() {
    return this._updatedAt;
  }

  toJSON() {
    return {
      id: this._id,
      projectName: this._projectName,
      description: this._description,
      imageUrl: this._imageUrl,
      ownerId: this._ownerId,
      createdAt: this._createdAt.toISOString(),
      updatedAt: this._updatedAt.toISOString(),
    };
  }
}
