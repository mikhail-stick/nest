// import { UserRole } from '../../user/user-role.enum';
// import { SetMetadata } from '@nestjs/common';
// import { ROLE_METADATA_KEY } from '../auth.constants';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../user/user-role.enum';

// export const Roles = (roles?: UserRole[]) =>
//   SetMetadata(ROLE_METADATA_KEY, roles);
export const Roles = Reflector.createDecorator<UserRole[]>();
