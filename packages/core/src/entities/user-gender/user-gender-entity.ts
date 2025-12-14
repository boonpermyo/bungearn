import { Entity } from '../base/base-entity';

export type UserGenderName = 'MALE' | 'FEMALE' | 'RATHER_NOT_SAY';

export type UserGenderAttributes = {
  id: string;
  name: UserGenderName;
};

export class UserGender extends Entity<UserGenderAttributes> {
  protected getDefaultAttributes(): UserGenderAttributes {
    return {
      id: '',
      name: 'RATHER_NOT_SAY'
    };
  }
}
