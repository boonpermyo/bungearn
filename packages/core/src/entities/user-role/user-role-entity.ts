import { Entity } from "../base/base-entity";

export type UserRoleName = "REGISTERED" | "GUEST" | "SUPER_ADMIN" | "ADMIN" | "ROOT";

export type UserRoleAttributes = {
  id: string;
  name: UserRoleName;
};

export class UserRole extends Entity<UserRoleAttributes> {
  protected getDefaultAttributes(): UserRoleAttributes {
    return {
      id: "",
      name: "GUEST"
    };
  }
}
