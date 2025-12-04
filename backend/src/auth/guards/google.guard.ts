import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GoogleAuthService } from '../google.service';
import { UsersService } from 'src/users/users.service';
import { CustomLogger } from 'src/logger/logger.service';

@Injectable()
export class GoogleAuthGuard implements CanActivate {
  constructor(
    private readonly googleAuthService: GoogleAuthService,
    private usersService: UsersService,
    private logger: CustomLogger,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.body?.id_token;

    if (!token) {
      throw new UnauthorizedException('No Google ID token provided');
    }

    const user = await this.googleAuthService.verifyIdToken(token);
    if (!user) {
      throw new UnauthorizedException('Invalid Google ID token');
    }
    const isExistingUser = await this.usersService.findByEmail(user.email);
    if (!isExistingUser) {
      throw new UnauthorizedException('User not registered');
    }
    request.user = isExistingUser;
    return true;
  }
}
