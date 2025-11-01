import { Entity } from '../base/base-entity';

export type ConversationAttributes = {
  id: string;
  conversationTypeId: string;
  createdAt: Date;
  deletedAt: Date | null;
};

export class Conversation extends Entity<ConversationAttributes> {
  protected getDefaultAttributes(): ConversationAttributes {
    return {
      id: '',
      conversationTypeId: '',
      createdAt: new Date(0),
      deletedAt: null
    };
  }
}
