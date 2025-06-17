import { Role } from '../../../data/generated/prisma';

export type UserRequestEntity = {
  id: string;
  username: string;
  roles: Role[];
};
