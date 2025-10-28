"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_ROLES = exports.USER_ROLE = void 0;
exports.USER_ROLE = Object.freeze({
    Registered: "REGISTERED",
    Guest: "GUEST",
    SuperAdmin: "SUPER_ADMIN",
    Admin: "ADMIN",
    Root: "ROOT"
});
exports.USER_ROLES = Object.freeze(Object.values(exports.USER_ROLE));
