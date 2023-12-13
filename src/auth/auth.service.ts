import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(loginDTO: LoginDto): Promise<any> {
    const user = await this.usersService.getbyEmail(loginDTO.email);
    const match = await bcrypt.compare(
      loginDTO.password,
      user._source.password,
    );
    if (!match) {
      throw new UnauthorizedException();
    }

    const payload = { id: user._id, email: user._source.email };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: await this.jwtService.signAsync(user._source.email, {
        expiresIn: '1d',
      }),
    };
  }
  async fetchMe(refreshToken: string): Promise<any> {
    const email = await this.jwtService.verifyAsync(refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET,
    });
    const user = await this.usersService.getbyEmail(email);
    const payload = { id: user._id, email: user._source.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
