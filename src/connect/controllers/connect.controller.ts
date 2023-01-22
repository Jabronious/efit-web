import {
  Controller,
  Get,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthFilter } from '../../auth/filters/auth.filter';

@Controller('connect')
@UseGuards(AuthGuard('jwt'))
@UseFilters(AuthFilter)
export class ConnectController {
  @Get()
  connect(@Req() req: Request, @Res() res: Response) {
    res.send(req.user);
  }
}
