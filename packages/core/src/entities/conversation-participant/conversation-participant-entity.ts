import { Entity } from "../base/base-entity";

export type ConversationParticipantAttributes = {
  id: string;
  conversationId: string;
  userId: string;
  joinedAt: Date;
  leftAt: Date | null;
};

export class ConversationParticipant extends Entity<ConversationParticipantAttributes> {
  protected getDefaultAttributes(): ConversationParticipantAttributes {
    return {
      id: "",
      conversationId: "",
      userId: "",
      joinedAt: new Date(0),
      leftAt: null
    };
  }
}
