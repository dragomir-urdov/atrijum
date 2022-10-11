import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';
import { Config } from '../../config';

export const AUTH0_STRATEGY = 'auth0';

@Injectable()
export class Auth0Strategy extends PassportStrategy(Strategy, AUTH0_STRATEGY) {
  constructor(private readonly configService: ConfigService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${configService.get<string>(
          Config.AUTH0_ISSUER_URL,
        )}.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: configService.get<string>(Config.AUTH0_AUDIENCE),
      issuer: configService.get<string>(Config.AUTH0_ISSUER_URL),
      algorithms: ['RS256'],
    });
  }

  validate(payload: unknown): unknown {
    console.log('USER PAYLOAD => ', payload);

    return payload;
  }
}
