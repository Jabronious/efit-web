import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { ConnectController } from './controllers/connect.controller';
import { ConnectService } from './services/connect.service';

@Module({
  imports: [UsersModule],
  controllers: [ConnectController],
  providers: [ConnectService],
})
export class ConnectModule {}
