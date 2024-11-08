import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CustomLogger } from 'src/logger/logger.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private logger: CustomLogger,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    this.logger.log('User creation', UsersController.name);
    const user = await this.usersService.create(createUserDto);
    delete user.password;
    delete user.email;

    return user;
  }

  @UseGuards(JwtGuard)
  @Get('me')
  async me(@Req() req) {
    delete req.user.password;
    return req.user;
  }
}
