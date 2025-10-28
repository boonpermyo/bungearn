"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
var Entity = /** @class */ (function () {
    function Entity(attributes) {
        var defaultAttributes = structuredClone(this.getDefaultAttributes());
        this.attributes = __assign(__assign({}, defaultAttributes), (attributes !== null && attributes !== void 0 ? attributes : {}));
    }
    Object.defineProperty(Entity.prototype, "fields", {
        get: function () {
            return this.attributes;
        },
        enumerable: false,
        configurable: true
    });
    Entity.prototype.update = function (attributes) {
        this.attributes = __assign(__assign({}, this.attributes), attributes);
    };
    Entity.prototype.toJSON = function () {
        return structuredClone(this.attributes);
    };
    return Entity;
}());
exports.Entity = Entity;
