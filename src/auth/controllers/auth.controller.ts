import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { User } from '../../users/schemas/users.schema';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('discord')
  @UseGuards(AuthGuard('discord'))
  async getUserFromDiscordLogin(@Req() req: Request): Promise<any> {
    return req.user;
  }

  @Get('redirect')
  @UseGuards(AuthGuard('discord'))
  async redirect(@Req() req: Request, @Res() res: Response) {
    const { accessToken } = await this.authService.login(req.user as User);

    res.cookie('jwt', accessToken);
    res.redirect('/connect');
  }

  @Get('logout')
  @UseGuards(AuthGuard('jwt'))
  logout(@Req() req: Request) {
    req.logOut((err) => {
      console.log(err);
    });
  }
}
