import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PrincipalType } from '../types/principal.type';

export const Principal = createParamDecorator(
  (data: unknown, context: ExecutionContext): PrincipalType => {
    const { user } = context.switchToHttp().getRequest();
    return user;
  },
);
