import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Auth0Strategy, AUTH0_STRATEGY } from './strategies/auth0.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: AUTH0_STRATEGY }),
  ],
  controllers: [AuthController],
  providers: [AuthService, Auth0Strategy],
  exports: [PassportModule],
})
export class AuthModule {}
