import { Entity } from "../base/base-entity";
export type ConversationTypeName = "DIRECT_MESSAGE" | "PRIVATE_GROUP_MESSAGE" | "PUBLIC_GROUP_MESSAGE";
export type ConversationTypeAttributes = {
    id: string;
    name: ConversationTypeName;
};
export declare class ConversationType extends Entity<ConversationTypeAttributes> {
    protected getDefaultAttributes(): ConversationTypeAttributes;
}
