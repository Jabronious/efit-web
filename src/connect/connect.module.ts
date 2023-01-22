import { Module } from '@nestjs/common';
import { ConnectController } from './controllers/connect.controller';

@Module({
  controllers: [ConnectController],
})
export class ConnectModule {}
