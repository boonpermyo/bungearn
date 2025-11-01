import type { UserRoleName } from './user-role-entity';

export const USER_ROLE = Object.freeze({
  Registered: 'REGISTERED',
  Guest: 'GUEST',
  SuperAdmin: 'SUPER_ADMIN',
  Admin: 'ADMIN',
  Root: 'ROOT'
});

export const USER_ROLES: ReadonlyArray<UserRoleName> = Object.freeze(Object.values(USER_ROLE));
