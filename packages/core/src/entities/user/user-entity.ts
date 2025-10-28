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

export class User extends Entity<UserAttributes> {
  protected getDefaultAttributes(): UserAttributes {
    return {
      id: "",
      username: "",
      aka: null,
      userRoleId: "",
      userGenderId: "",
      createdAt: new Date(0),
      updatedAt: new Date(0),
      deletedAt: null,
      isActive: false
    };
  }
}
