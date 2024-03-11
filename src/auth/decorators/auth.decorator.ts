import { UserRole } from '../../user/user-role.enum';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles } from './roles.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

export function Auth(roles?: UserRole[]) {
  if (roles)
    return applyDecorators(Roles(roles), UseGuards(AuthGuard, RolesGuard));
  return applyDecorators(ApiBearerAuth(), UseGuards(AuthGuard));
}
