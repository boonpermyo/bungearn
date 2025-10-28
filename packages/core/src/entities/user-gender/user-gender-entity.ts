import { Entity } from "../base/base-entity";

export type UserGenderAttributes = {
  id: string;
  name: string;
};

export class UserGender extends Entity<UserGenderAttributes> {
  protected getDefaultAttributes(): UserGenderAttributes {
    return {
      id: "",
      name: ""
    };
  }
}
