import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { configs } from './configuration';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { ConnectModule } from './connect/connect.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    AuthModule,
    ConnectModule,
    PassportModule.register({ session: true }),
    MongooseModule.forRoot(configs.COSMOS_CONNECTION_STRING),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
