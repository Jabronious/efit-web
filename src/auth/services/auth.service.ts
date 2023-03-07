import { Injectable } from '@nestjs/common';
import { Profile } from 'passport-discord';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

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
}
