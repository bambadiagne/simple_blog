import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private _db: DatabaseService) {}
  async create(createUserDto: CreateUserDto) {
    const { username, email, password, role } = createUserDto;
    const isExist = await this._db.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });
    if (isExist) {
      throw new BadRequestException("Nom d'utilisateur ou email déjà utilisé");
    }
    return await this._db.user.create({
      data: {
        username,
        email,
        password: await bcrypt.hash(password, 10),
        role,
        is_verified: false,
        picture: createUserDto.picture || null,
      },
    });
  }

  async findById(id: number) {
    const user = await this._db.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string) {
    return await this._db.user.findFirst({
      where: {
        email,
      },
    });
  }
  async update(id: number, data: any) {
    return await this._db.user.update({
      where: {
        id,
      },
      data,
    });
  }
}
