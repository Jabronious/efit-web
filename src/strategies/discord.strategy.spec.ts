import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Profile } from 'passport-discord';
import { AuthService } from '../auth/services/auth.service';
import { DiscordStrategy } from './discord.strategy';

// Mock user object
const mockUser = {
  id: '12345',
  email: 'test@example.com',
  name: 'Test User',
};

describe('DiscordStrategy', () => {
  let authService: AuthService;
  let discordStrategy: DiscordStrategy;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        DiscordStrategy,
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn().mockResolvedValue(mockUser),
          },
        },
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    discordStrategy = moduleRef.get<DiscordStrategy>(DiscordStrategy);
  });

  describe('validate', () => {
    it('should validate user and return user object', async () => {
      const accessToken = 'access_token';
      const refreshToken = 'refresh_token';
      const profile: Partial<Profile> = {
        id: '12345',
        username: 'testuser',
        discriminator: '1234',
        email: 'test@example.com',
        avatar: 'avatar.png',
        provider: 'discord',
        locale: '',
        mfa_enabled: false,
        flags: 0,
        banner: '',
        accent_color: 0,
        verified: false,
        fetchedAt: '',
        displayName: '',
      };

      const result = await discordStrategy.validate(
        accessToken,
        refreshToken,
        profile as Profile,
      );

      expect(authService.validateUser).toHaveBeenCalledWith(profile);
      expect(result).toEqual(mockUser);
    });

    it('should throw an UnauthorizedException when user is not found', async () => {
      jest.spyOn(authService, 'validateUser').mockResolvedValue(null);

      const accessToken = 'access_token';
      const refreshToken = 'refresh_token';
      const profile: Partial<Profile> = {
        id: '12345',
        username: 'testuser',
        discriminator: '1234',
        email: 'test@example.com',
        avatar: 'avatar.png',
        provider: 'discord',
        locale: '',
        mfa_enabled: false,
        flags: 0,
        banner: '',
        accent_color: 0,
        verified: false,
        fetchedAt: '',
        displayName: '',
      };

      await expect(
        discordStrategy.validate(accessToken, refreshToken, profile as Profile),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
