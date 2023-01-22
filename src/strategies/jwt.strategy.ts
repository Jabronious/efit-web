import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { configs } from '../configuration';
import { JwtPayload } from '../shared/types/auth';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (request: Request) =>
          request?.cookies?.jwt || request.headers.cookie?.replace('jwt=', ''),
      ]),
      ignoreExpiration: false,
      secretOrKey: configs.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    return {
      id: payload.sub,
      username: payload.username,
      discriminator: payload.discriminator,
    };
  }
}
