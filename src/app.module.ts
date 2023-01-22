import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { configs } from './configuration';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from './users/users.module';
import { ConnectModule } from './connect/connect.module';

@Module({
  imports: [
    AuthModule,
    ConnectModule,
    UsersModule,
    HttpModule,
    PassportModule.register({ session: true }),
    MongooseModule.forRoot(configs.COSMOS_CONNECTION_STRING),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
