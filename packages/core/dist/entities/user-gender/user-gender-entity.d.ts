import { Entity } from "../base/base-entity";
export type UserGenderAttributes = {
    id: string;
    name: string;
};
export declare class UserGender extends Entity<UserGenderAttributes> {
    protected getDefaultAttributes(): UserGenderAttributes;
}
