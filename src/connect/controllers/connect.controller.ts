import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ParentController } from '../../shared/controllers/parent.controller';
import { ErrorResponseInterceptorInterceptor } from '../../shared/interceptors/error-response-interceptor/error-response-interceptor.interceptor';
import { UsersService } from '../../users/services/users.service';
import { ConnectDto } from '../dto/connect.dto';
import { ConnectService } from '../services/connect.service';

@Controller('connect')
export class ConnectController extends ParentController {
  constructor(
    private userSerivce: UsersService,
    private connectService: ConnectService,
  ) {
    super();
  }

  @Get()
  @Render('connect/index')
  async getConnect(@Req() req: Request, @Res() _res: Response) {
    const user = await this.userSerivce.findByDiscordId(req.user.discordId);
    return { user };
  }

  @Post()
  @Render('connect/index')
  @UseInterceptors(ErrorResponseInterceptorInterceptor)
  async postConnect(
    @Body() connectDto: ConnectDto,
    @Req() req: Request,
    @Res() _res: Response,
  ) {
    const user = await this.userSerivce.update({
      discordId: req.user.discordId,
      espn_s2: this.connectService.encrypt(connectDto.espn_s2),
      swid: this.connectService.encrypt(connectDto.swid),
    });
    return { user };
  }
}
