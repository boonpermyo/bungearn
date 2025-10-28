import { Entity } from "../base/base-entity";

export type MessageReadAttributes = {
  id: string;
  messageId: string;
  userId: string;
  readAt: Date;
};

export class MessageRead extends Entity<MessageReadAttributes> {
  protected getDefaultAttributes(): MessageReadAttributes {
    return {
      id: "",
      messageId: "",
      userId: "",
      readAt: new Date(0)
    };
  }
}
