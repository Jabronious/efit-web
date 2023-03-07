import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../users/services/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  const mockUser = {
    username: 'string',
    discriminator: 'string',
  };

  let findByDiscordIdFunc: jest.Mock;
  let updateFunc: jest.Mock;
  beforeEach(async () => {
    findByDiscordIdFunc = jest.fn();
    updateFunc = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByDiscordId: findByDiscordIdFunc,
            update: updateFunc,
            create: jest.fn().mockReturnValue({ mockUser, created: true }),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('.validateUser', () => {
    it('should create the user because one was not present in DB', async () => {
      const result = await service.validateUser({
        id: 1,
      } as any);
      expect(result.created).toBeTruthy();
    });

    it('should update the user because one was present in DB', async () => {
      findByDiscordIdFunc.mockResolvedValue(mockUser);
      updateFunc.mockReturnValue({ mockUser, updated: true });
      const result = await service.validateUser({
        id: 1,
      } as any);
      expect(result.updated).toBeTruthy();
    });
  });
});
