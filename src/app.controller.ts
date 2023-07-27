import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
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
