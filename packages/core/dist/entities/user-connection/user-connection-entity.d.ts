import { Entity } from "../base/base-entity";
export type UserConnectionAttributes = {
    id: string;
    requesterId: string;
    addresseeId: string;
    isAccept: boolean;
    requestedAt: Date;
    acceptedAt: Date | null;
};
export declare class UserConnection extends Entity<UserConnectionAttributes> {
    protected getDefaultAttributes(): UserConnectionAttributes;
}
