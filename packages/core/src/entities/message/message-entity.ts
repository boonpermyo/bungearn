import { Entity } from '../base/base-entity';

export type MessageAttributes = {
  id: string;
  senderId: string;
  conversationId: string;
  content: string;
  sentAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export class Message extends Entity<MessageAttributes> {
  protected getDefaultAttributes(): MessageAttributes {
    return {
      id: '',
      senderId: '',
      conversationId: '',
      content: '',
      sentAt: new Date(0),
      updatedAt: new Date(0),
      deletedAt: null
    };
  }
}
