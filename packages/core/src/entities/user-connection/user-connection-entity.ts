import { Entity } from "../base/base-entity";

export type UserConnectionAttributes = {
  id: string;
  requesterId: string;
  addresseeId: string;
  isAccept: boolean;
  requestedAt: Date;
  acceptedAt: Date | null;
};

export class UserConnection extends Entity<UserConnectionAttributes> {
  protected getDefaultAttributes(): UserConnectionAttributes {
    return {
      id: "",
      requesterId: "",
      addresseeId: "",
      isAccept: false,
      requestedAt: new Date(0),
      acceptedAt: null
    };
  }
}
