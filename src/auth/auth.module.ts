import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { DiscordStrategy } from '../strategies/discord.strategy';
import { AuthController } from './controllers/auth.controller';
import { UsersModule } from '../users/users.module';
import { configs } from '../configuration';
import { SerializerService } from './services/serializer.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: configs.JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthService, DiscordStrategy, SerializerService],
  controllers: [AuthController],
})
export class AuthModule {}
