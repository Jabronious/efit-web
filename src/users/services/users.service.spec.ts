import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model, ObjectId } from 'mongoose';
import { User, UserDocument } from '../schemas/users.schema';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersService } from './users.service';
import { MockUserModel } from '../../../test/mocks/user.model.mock';
import { v4 as uuidv4 } from 'uuid';

describe('UsersService', () => {
  let service: UsersService;
  let userModel: Model<UserDocument>;

  const mockUser = (
    username = 'Ventus',
    discriminator = 'a uuid',
    id = uuidv4(),
  ): User => ({
    username,
    discriminator,
    id,
  });

  // still lazy, but this time using an object instead of multiple parameters
  const mockUserDoc = (mock?: Partial<User>): Partial<UserDocument> => ({
    username: mock?.username || 'Ventus',
    discriminator: mock?.discriminator || 'dsic',
    id: mock?.id || uuidv4(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(User.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser()),
            constructor: jest.fn().mockResolvedValue(mockUser()),
            find: jest.fn(),
            findOne: jest.fn(),
            findOneAndUpdate: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            findById: jest.fn(),
          },
        },
        UsersService,
      ],
    }).compile();
    // Make sure to use the correct Document Type for the 'module.get' func
    userModel = module.get<Model<UserDocument>>(getModelToken(User.name));
    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return a user doc', async () => {
      const user = mockUser();
      jest
        .spyOn(userModel, 'create')
        .mockImplementationOnce(() => Promise.resolve(user));
      const newUser = await service.create(user as CreateUserDto);
      expect(newUser).toEqual(user);
    });
  });
  describe('update', () => {
    it('should return a user doc', async () => {
      const user = mockUser();
      jest.spyOn(userModel, 'findOneAndUpdate').mockReturnValue({
        lean: jest.fn().mockResolvedValueOnce(user),
      } as any);
      const updatedUser = await service.update(user as UpdateUserDto);
      expect(updatedUser).toEqual(user);
    });
  });

  describe('findAll', () => {
    it('should return all user docs', async () => {
      const userOne = mockUser();
      const userTwo = mockUser('user2');
      jest.spyOn(userModel, 'find').mockReturnValue({
        lean: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValueOnce([userOne, userTwo]),
        }),
      } as any);
      const findAll = await service.findAll();
      expect(findAll).toEqual([userOne, userTwo]);
    });
  });

  describe('findById', () => {
    it('should return user doc', async () => {
      const user = mockUser();
      jest.spyOn(userModel, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(user),
      } as any);
      const findById = await service.findById(user.id);
      expect(findById).toEqual(user);
    });
  });

  describe('findfindByDiscordIdById', () => {
    it('should return user doc', async () => {
      const user = mockUser();
      jest.spyOn(userModel, 'findOne').mockReturnValue({
        lean: jest.fn().mockResolvedValueOnce(user),
      } as any);
      const findByDiscordId = await service.findByDiscordId(user.id);
      expect(findByDiscordId).toEqual(user);
    });
  });
});
