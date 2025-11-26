// src/domain/entities/Channel.ts
export interface ChannelProps {
  id: string;
  projectId: string;
  channelName: string;
  description: string;
  createdBy: string;
  isPrivate: boolean;
  lastMessage?: string;
  unreadCount?: number;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export class Channel {
  private readonly _id: string;
  private readonly _projectId: string;
  private readonly _channelName: string;
  private readonly _description: string;
  private readonly _createdBy: string;
  private readonly _isPrivate: boolean;
  private readonly _lastMessage?: string;
  private readonly _unreadCount: number;
  private readonly _createdAt: Date;
  private readonly _updatedAt: Date;

  constructor(props: ChannelProps) {
    this._id = props.id;
    this._projectId = props.projectId;
    this._channelName = props.channelName;
    this._description = props.description;
    this._createdBy = props.createdBy;
    this._isPrivate = props.isPrivate;
    this._lastMessage = props.lastMessage;
    this._unreadCount = props.unreadCount ?? 0;
    this._createdAt = new Date(props.createdAt);
    this._updatedAt = new Date(props.updatedAt);
  }

  get id() {
    return this._id;
  }
  get projectId() {
    return this._projectId;
  }
  get channelName() {
    return this._channelName;
  }
  get description() {
    return this._description;
  }
  get createdBy() {
    return this._createdBy;
  }
  get isPrivate() {
    return this._isPrivate;
  }
  get lastMessage() {
    return this._lastMessage;
  }
  get unreadCount() {
    return this._unreadCount;
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
      projectId: this._projectId,
      channelName: this._channelName,
      description: this._description,
      createdBy: this._createdBy,
      isPrivate: this._isPrivate,
      lastMessage: this._lastMessage,
      unreadCount: this._unreadCount,
      createdAt: this._createdAt.toISOString(),
      updatedAt: this._updatedAt.toISOString(),
    };
  }
}
