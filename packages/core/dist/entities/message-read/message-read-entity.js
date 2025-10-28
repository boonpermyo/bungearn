"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRead = void 0;
var base_entity_1 = require("../base/base-entity");
var MessageRead = /** @class */ (function (_super) {
    __extends(MessageRead, _super);
    function MessageRead() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MessageRead.prototype.getDefaultAttributes = function () {
        return {
            id: "",
            messageId: "",
            userId: "",
            readAt: new Date(0)
        };
    };
    return MessageRead;
}(base_entity_1.Entity));
exports.MessageRead = MessageRead;
