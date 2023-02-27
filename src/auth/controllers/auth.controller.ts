import {
  Controller,
  Get,
  Render,
  Req,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { DiscordGuard } from '../../shared/guards/discord.guard';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('discord')
  @UseGuards(DiscordGuard)
  async getUserFromDiscordLogin(@Req() req: Request): Promise<any> {
    return req.user;
  }

  @Get('redirect')
  @UseGuards(DiscordGuard)
  async redirect(@Req() req: Request, @Res() res: Response) {
    res.redirect('/connect');
  }

  @Get()
  @Render('auth/index')
  async loginConnect(@Req() req: Request, @Res() _res: Response) {}

  @Get('logout')
  async logout(
    @Req() req: Request,
    @Res() res: Response,
    @Session() session: Record<string, any>,
  ) {
    req.logout((err) => {
      console.log(err);
    });

    res.redirect('/auth');
  }
}
