import { Entity } from "../base/base-entity";
export type ConversationAttributes = {
    id: string;
    conversationTypeId: string;
    createdAt: Date;
    deletedAt: Date | null;
};
export declare class Conversation extends Entity<ConversationAttributes> {
    protected getDefaultAttributes(): ConversationAttributes;
}
