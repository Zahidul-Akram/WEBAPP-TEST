import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/user-register-user.dto';
import { LoginDto } from './dto/user-log-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.usersService.findByUsername(dto.username, dto.password);
    if (existing) throw new ConflictException('Username already exists');

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.usersService.create({
      username: dto.username,
      name: dto.name,
      email: dto.email,
      password: hashed,
    });

    const token = this.jwtService.sign({ sub: user.id });
    return { token };
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByUsername(dto.username, dto.password);
    // return user
    if (!user) throw new UnauthorizedException('Invalid credentials');

    // const match = await bcrypt.compare(dto.password, user.password);
    // if (!match) throw new UnauthorizedException('Invalid credentials');

    const token = this.jwtService.sign({ sub: user.id });
    return { token , userId: user.id };
  }

  async verify(token: string) {
    return this.jwtService.verifyAsync(token);
  }
}