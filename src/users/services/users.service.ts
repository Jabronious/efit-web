import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/users.schema';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }

  async update(updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel
      .findOneAndUpdate({ discordId: updateUserDto.discordId }, updateUserDto, {
        new: true,
      })
      .lean();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().lean().exec();
  }

  async findById(id: string): Promise<User | void> {
    return this.userModel.findById(id).exec();
  }

  async findByDiscordId(discordId: string): Promise<User | void> {
    const user = await this.userModel.findOne({ discordId: discordId }).lean();
    return user;
  }
}
