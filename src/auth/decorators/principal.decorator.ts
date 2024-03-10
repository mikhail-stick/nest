import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { PrincipalType } from '../types/principal.type';

export const Principal = createParamDecorator(
  (data: unknown, context: ExecutionContext): PrincipalType => {
    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  },
);
