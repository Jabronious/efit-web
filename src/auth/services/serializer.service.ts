import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { User } from '../../users/schemas/users.schema';

@Injectable()
export class SerializerService extends PassportSerializer {
  constructor(private readonly userService: UsersService) {
    super();
  }

  serializeUser(user: User, done: Function) {
    done(null, user);
  }

  async deserializeUser(sessionUser: User, done: Function) {
    const user = await this.userService.findByDiscordId(sessionUser.id);
    return user ? done(null, user) : done(null, null);
  }
}
