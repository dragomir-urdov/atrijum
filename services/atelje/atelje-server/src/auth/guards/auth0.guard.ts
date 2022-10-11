import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { Observable } from 'rxjs';

import { IS_PUBLIC_KEY } from './public.metadata';
import { AUTH0_STRATEGY } from '../strategies/auth0.strategy';

@Injectable()
export class Auth0Guard extends AuthGuard(AUTH0_STRATEGY) {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  /**
   * It determines is user allowed to access API endpoint.
   *
   * @author Dragomir Urdov
   * @param context Execution context.
   * @returns Is user allowed to access API endpoint.
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}
