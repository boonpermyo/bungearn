"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONVERSATION_TYPES = exports.CONVERSATION_TYPE = void 0;
exports.CONVERSATION_TYPE = Object.freeze({
    DirectMessage: "DIRECT_MESSAGE",
    PrivateGroupMessage: "PRIVATE_GROUP_MESSAGE",
    PublicGroupMessage: "PUBLIC_GROUP_MESSAGE"
});
exports.CONVERSATION_TYPES = Object.freeze(Object.values(exports.CONVERSATION_TYPE));
