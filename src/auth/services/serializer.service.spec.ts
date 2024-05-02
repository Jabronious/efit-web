import { Test } from '@nestjs/testing';
import { SerializerService } from './serializer.service';
import { UsersService } from '../../users/services/users.service';
import { User } from '../../users/schemas/users.schema';

describe('SerializerService', () => {
  let serializerService: SerializerService;
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        SerializerService,
        {
          provide: UsersService,
          useValue: {
            findByDiscordId: jest.fn(),
          },
        },
      ],
    }).compile();

    serializerService = moduleRef.get<SerializerService>(SerializerService);
    usersService = moduleRef.get<UsersService>(UsersService);
  });

  describe('serializeUser', () => {
    it('should call done with the user object', () => {
      const doneFn = jest.fn();
      const user: User = {
        discordId: '1',
        discriminator: '',
        username: '',
      };

      serializerService.serializeUser(user, doneFn);

      expect(doneFn).toHaveBeenCalledWith(null, user);
    });
  });

  describe('deserializeUser', () => {
    it('should call done with the user object when user is found', async () => {
      const doneFn = jest.fn();
      const sessionUser: User = {
        discordId: '1',
        username: 'John',
        discriminator: '',
      };
      const user: User = {
        discordId: '1',
        username: 'John',
        discriminator: '123456789',
      };

      jest.spyOn(usersService, 'findByDiscordId').mockResolvedValue(user);

      await serializerService.deserializeUser(sessionUser, doneFn);

      expect(usersService.findByDiscordId).toHaveBeenCalledWith(
        sessionUser.discordId,
      );
      expect(doneFn).toHaveBeenCalledWith(null, user);
    });

    it('should call done with null when user is not found', async () => {
      const doneFn = jest.fn();
      const sessionUser: User = {
        discordId: '1',
        username: 'John',
        discriminator: '',
      };

      jest.spyOn(usersService, 'findByDiscordId').mockResolvedValue(null);

      await serializerService.deserializeUser(sessionUser, doneFn);

      expect(usersService.findByDiscordId).toHaveBeenCalledWith(
        sessionUser.discordId,
      );
      expect(doneFn).toHaveBeenCalledWith(null, null);
    });
  });
});
