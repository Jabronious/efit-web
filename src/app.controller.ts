import { Controller, Get, Redirect } from '@nestjs/common';
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

  @Get('livez')
  getLivez(): string {
    return this.appService.getHello();
  }

  @Get('readyz')
  getReadyz(): string {
    return this.appService.getHello();
  }
}
