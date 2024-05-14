import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { ConnectController } from './controllers/connect.controller';
import { ConnectService } from './services/connect.service';
import { EncryptService } from 'src/encrypt/services/encrypt.serivce';

@Module({
  imports: [UsersModule],
  controllers: [ConnectController],
  providers: [ConnectService, EncryptService],
})
export class ConnectModule {}
