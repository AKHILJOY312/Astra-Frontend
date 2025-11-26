// src/application/use-cases/channel/DeleteChannelUseCase.ts
import { inject, injectable } from "inversify";
import { type ChannelRepository } from "../../repo/ChannelRepository";
import { TYPES } from "@/di/types";
@injectable()
export class DeleteChannelUseCase {
  constructor(
    @inject(TYPES.ChannelRepository)
    private channelRepo: ChannelRepository
  ) {}

  async execute(channelId: string): Promise<void> {
    await this.channelRepo.delete(channelId);
  }
}
