import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { Request, Response } from 'express';

describe('ConnectController', () => {
  let authController: AuthController;

  const mockUser = {
    username: 'string',
    discriminator: 'string',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AuthController],
      providers: [],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  describe('GET user from discordID should return user', () => {
    it('should return user object', async () => {
      const req = { user: mockUser } as Request;
      const res = {} as Response;
      const result = await authController.getUserFromDiscordLogin(req);

      expect(result).toEqual(mockUser);
    });
  });

  describe('GET redirect', () => {
    it('redirect to /connect', async () => {
      const res = {
        redirect: jest.fn(),
      } as unknown as Response;

      await authController.redirect(res);

      expect(res.redirect).toHaveBeenCalledWith('/connect');
    });
  });

  describe('GET logout', () => {
    it('redirect to /auth', async () => {
      const req = {
        logout: jest.fn(),
      } as unknown as Request;
      const res = {
        redirect: jest.fn(),
      } as unknown as Response;

      await authController.logout(req, res);

      expect(res.redirect).toHaveBeenCalledWith('/auth');
    });
  });
});
