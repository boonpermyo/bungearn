import { Entity } from "../base/base-entity";
export type MessageReadAttributes = {
    id: string;
    messageId: string;
    userId: string;
    readAt: Date;
};
export declare class MessageRead extends Entity<MessageReadAttributes> {
    protected getDefaultAttributes(): MessageReadAttributes;
}
