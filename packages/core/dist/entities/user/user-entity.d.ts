import { Entity } from "../base/base-entity";
export type UserAttributes = {
    id: string;
    username: string;
    aka: string | null;
    userRoleId: string;
    userGenderId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    isActive: boolean;
};
export declare class User extends Entity<UserAttributes> {
    protected getDefaultAttributes(): UserAttributes;
}
