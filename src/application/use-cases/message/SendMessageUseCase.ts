import { Message } from '../../../domain/entities/message/Message';
import { MessageGateway } from '../../gateways/MessageGateway';

export class SendMessageUseCase {
  constructor(private messageGateway: MessageGateway) {}

  async execute(channelId: string, content: string, type: Message['type'] = 'text'): Promise<Message> {
    return this.messageGateway.send(channelId, content, type);
  }
}
