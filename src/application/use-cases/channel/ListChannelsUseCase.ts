// src/application/use-cases/channel/ListChannelsUseCase.ts
import type { ChannelRepository } from "@/application/repo/ChannelRepository";
import { TYPES } from "@/di/types";
import type { Channel } from "@/domain/entities/channel/Channel";
import { inject, injectable } from "inversify";
@injectable()
export class ListChannelsUseCase {
  constructor(
    @inject(TYPES.ChannelRepository) private channelRepo: ChannelRepository
  ) {}

  async execute(projectId: string): Promise<Channel[]> {
    return await this.channelRepo.getByProject(projectId);
  }
}
