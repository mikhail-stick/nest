import { UserRole } from '../../user/user-role.enum';
import { SetMetadata } from '@nestjs/common';
import { ROLE } from '../auth.constants';

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLE, roles);
