import { Module } from '@nestjs/common';
import { EncryptService } from './services/encrypt.serivce';

@Module({
  imports: [],
  providers: [EncryptService],
  controllers: [],
})
export class EncryptModule {}
