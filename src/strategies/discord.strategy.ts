import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Profile, Strategy } from 'passport-discord';
import { configs } from '../configuration';
import { User } from '../users/schemas/users.schema';
import { AuthService } from '../auth/services/auth.service';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      clientID: configs.FBB_BOT_CLIENT_ID,
      clientSecret: configs.FBB_BOT_SECRET,
      callbackURL: configs.OAUTH_CALLBACK_URL,
      scope: ['identify'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ): Promise<User> {
    const user = await this.authService.validateUser(profile);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
