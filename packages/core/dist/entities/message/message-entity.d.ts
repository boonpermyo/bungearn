import { Entity } from "../base/base-entity";
export type MessageAttributes = {
    id: string;
    senderId: string;
    conversationId: string;
    content: string;
    sentAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
};
export declare class Message extends Entity<MessageAttributes> {
    protected getDefaultAttributes(): MessageAttributes;
}
