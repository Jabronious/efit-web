import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Profile } from 'passport-discord';
import { AuthResponse, JwtPayload } from '../../shared/types/auth';
import { User } from '../../users/schemas/users.schema';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(profile: Profile): Promise<any> {
    const discordId = profile.id;
    const { username, discriminator } = profile;

    let user = await this.usersService.findByDiscordId(discordId);
    if (user) {
      user = await this.usersService.update({
        id: discordId,
      });
      return user;
    }

    return this.usersService.create({
      id: discordId,
      username: username,
      discriminator: discriminator,
    });
  }

  async login(user: User): Promise<AuthResponse> {
    const payload: JwtPayload = {
      username: user.username,
      sub: user.discordId,
      discriminator: user.discriminator,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
