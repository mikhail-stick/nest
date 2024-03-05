import { UserRole } from '../../user/user-role.enum';

export type PrincipalType = {
  sub: number;
  email: string;
  role: UserRole | string;
};
