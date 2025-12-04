import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UserRole } from './dtos/create-user.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CustomLogger } from 'src/logger/logger.service';
import { CodeVerificationService } from 'src/code-verification/code-verification.service';
import { SesService } from 'src/common/services/mailing/ses.service';
import { CodeVerificationDto } from 'src/code-verification/dto/code-verification.dto';
import { GoogleAuthService } from 'src/auth/google.service';
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly codeVerificationService: CodeVerificationService,
    private readonly googleAuthService: GoogleAuthService,
    private readonly emailService: SesService,
    private logger: CustomLogger,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    this.logger.log('User creation', UsersController.name);
    const user = await this.usersService.create(createUserDto);
    const code = await this.codeVerificationService.create(user.id);
    await this.emailService.sendEmail(
      user.email,
      'Verification code',
      this.emailService.formatEmailTemplate(user.username, code.code),
    );
    delete user.password;
    delete user.email;
    return user;
  }

  @Post('google')
  async googleAuth(@Body('id_token') idToken: string) {
    const user = await this.googleAuthService.verifyIdToken(idToken);
    const isAlreadyRegistered = await this.usersService.findByEmail(user.email);
    if (isAlreadyRegistered) {
      throw new BadRequestException('User already registered');
    }
    return this.usersService.create({
      username: user.name,
      email: user.email,
      password: Math.random().toString(36),
      role: UserRole.USER,
      picture: user.picture,
    });
  }
  @UseGuards(JwtGuard)
  @Get('me')
  async me(@Req() req) {
    delete req.user.password;
    return req.user;
  }
  @UseGuards(JwtGuard)
  @Post('verify')
  async verify(@Req() req, @Body() codeVerificationDto: CodeVerificationDto) {
    const code = await this.codeVerificationService.findByCodeAndUser(
      codeVerificationDto.code,
      req.user.id,
    );
    if (!code) {
      throw new BadRequestException('Invalid code');
    }
    await this.usersService.update(req.user.id, { is_verified: true });
    await this.codeVerificationService.delete(code.id);

    return { message: 'Verification successful', status: true };
  }
  @UseGuards(JwtGuard)
  @Post('resend')
  async resend(@Req() req) {
    const user = await this.usersService.findById(req.user.id);
    if (user.is_verified) {
      throw new BadRequestException('User is already verified');
    }
    const oldCode = await this.codeVerificationService.findByUser(req.user.id);
    if (oldCode) {
      throw new BadRequestException('Code already sent.Wait for 15 minutes');
    }
    const code = await this.codeVerificationService.create(req.user.id);
    await this.emailService.sendEmail(
      user.email,
      'Verification code',
      this.emailService.formatEmailTemplate(req.user.username, code.code),
    );
    return { message: 'Code sent' };
  }
}
