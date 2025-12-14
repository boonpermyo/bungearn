import type { UserGenderName } from './user-gender-entity';

export const USER_GENDER = Object.freeze({
  Male: 'MALE',
  Female: 'FEMALE',
  RatherNotSay: 'RATHER_NOT_SAY'
} satisfies Record<string, UserGenderName>);

export const USER_GENDERS: ReadonlyArray<UserGenderName> = Object.freeze(Object.values(USER_GENDER));
