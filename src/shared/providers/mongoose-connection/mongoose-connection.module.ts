import { Module } from '@nestjs/common';
import { mongooseConnectionProvider } from './mongoose-connection.provider';

@Module({
  providers: [...mongooseConnectionProvider],
  exports: [...mongooseConnectionProvider],
})
export class MongooseConnectionModule {}
