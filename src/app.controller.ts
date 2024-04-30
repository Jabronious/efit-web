import { Controller, Get, Redirect, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect()
  redirectToConnect() {
    return {
      url: '/connect',
      statusCode: 302,
    };
  }
}
