import { Entity } from "../base/base-entity";
export type ConversationParticipantAttributes = {
    id: string;
    conversationId: string;
    userId: string;
    joinedAt: Date;
    leftAt: Date | null;
};
export declare class ConversationParticipant extends Entity<ConversationParticipantAttributes> {
    protected getDefaultAttributes(): ConversationParticipantAttributes;
}
