import { Controller, Get, Render, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from '../../users/schemas/users.schema';
import { DiscordGuard } from '../../shared/guards/discord.guard';

@Controller('auth')
export class AuthController {
  @Get('discord')
  @UseGuards(DiscordGuard)
  async getUserFromDiscordLogin(@Req() req: Request): Promise<User> {
    return req.user;
  }

  @Get('redirect')
  @UseGuards(DiscordGuard)
  async redirect(@Res() res: Response) {
    res.redirect('/connect');
  }

  @Get()
  @Render('auth/index')
  async loginConnect() {}

  @Get('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    req.logout((err) => {
      console.log(err);
    });

    res.redirect('/auth');
  }
}
