import { Controller, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { RefreshTokenGuard } from './guards/refresh.guard';
import { ConfigService } from '@nestjs/config';
import { GoogleAuthGuard } from './guards/google.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {}

  @UseGuards(GoogleAuthGuard)
  @Post('google')
  async googleLogin(@Req() req, @Res({ passthrough: true }) res) {
    const tokens = await this.authService.signToken(req.user);
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      sameSite: 'strict',
      maxAge: 604800000, // 7 days
    });

    return { access_token: tokens.access_token, userId: req.user.id };
  }

  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Req() req, @Res({ passthrough: true }) res) {
    const tokens = await this.authService.signToken(req.user);
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      sameSite: 'strict',
      maxAge: 604800000, // 7 days
    });

    return { access_token: tokens.access_token, userId: req.user.id };
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  async refresh(@Request() req) {
    return this.authService.refreshToken(req.user);
  }
  @Post('logout')
  async logout(@Res({ passthrough: true }) res) {
    res.clearCookie('refresh_token');
    return { message: 'Logged out' };
  }
}
