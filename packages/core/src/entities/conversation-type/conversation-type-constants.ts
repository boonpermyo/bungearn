import type { ConversationTypeName } from "./conversation-type-entity";

export const CONVERSATION_TYPE = Object.freeze({
  DirectMessage: "DIRECT_MESSAGE",
  PrivateGroupMessage: "PRIVATE_GROUP_MESSAGE",
  PublicGroupMessage: "PUBLIC_GROUP_MESSAGE"
});

export const CONVERSATION_TYPES: ReadonlyArray<ConversationTypeName> = Object.freeze(
  Object.values(CONVERSATION_TYPE)
);
