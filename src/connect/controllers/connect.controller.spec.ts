import { Test, TestingModule } from '@nestjs/testing';
import { ConnectController } from './connect.controller';
import { UsersService } from '../../users/services/users.service';
import { ConnectService } from '../services/connect.service';
import { Request, Response } from 'express';

describe('ConnectController', () => {
  let connectController: ConnectController;
  let connectService: ConnectService;
  const mockUser = {
    username: 'string',
    discriminator: 'string',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [ConnectController],
      providers: [
        ConnectService,
        {
          provide: UsersService,
          useValue: {
            findByDiscordId: jest.fn().mockResolvedValue(mockUser),
            update: jest.fn().mockResolvedValue(mockUser),
          },
        },
      ],
    }).compile();

    connectController = module.get<ConnectController>(ConnectController);
    connectService = module.get<ConnectService>(ConnectService);
  });

  describe('GET connect', () => {
    it('should return user object', async () => {
      const req = { user: { id: '1' } } as Request;
      const res = {} as Response;
      const result = await connectController.getConnect(req, res);

      expect(result).toEqual({ user: mockUser });
    });
  });

  describe('POST connect', () => {
    it('should update user with encrypted ESPN S2 and SWID', async () => {
      const encryptedEspnS2 = 'encryptedEspnS2';
      const encryptedSwid = 'encryptedSwid';
      const req = { user: { id: '1' } } as Request;
      const res = {} as Response;
      const connectDto = { espn_s2: encryptedEspnS2, swid: encryptedSwid };
      const result = await connectController.postConnect(connectDto, req, res);
      expect(result).toEqual({ user: mockUser });
    });
  });
});
