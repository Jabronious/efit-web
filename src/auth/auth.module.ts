import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { DiscordStrategy } from '../strategies/discord.strategy';
import { AuthController } from './controllers/auth.controller';
import { UsersModule } from '../users/users.module';
import { SerializerService } from './services/serializer.service';

@Module({
  imports: [UsersModule],
  providers: [AuthService, DiscordStrategy, SerializerService],
  controllers: [AuthController],
})
export class AuthModule {}
