// src/application/use-cases/channel/CreateChannelUseCase.ts
import type {
  ChannelRepository,
  CreateChannelDTO,
} from "../../repo/ChannelRepository";
import { Channel } from "../../../domain/entities/channel/Channel";
import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";
@injectable()
export class CreateChannelUseCase {
  constructor(
    @inject(TYPES.ChannelRepository)
    private channelRepo: ChannelRepository
  ) {}

  async execute(dto: CreateChannelDTO): Promise<Channel> {
    return await this.channelRepo.create(dto);
  }
}
