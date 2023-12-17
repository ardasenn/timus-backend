import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService) {}

  async signIn(loginDTO: LoginDto, response: Response): Promise<any> {
    const user = await this.usersService.getbyEmail(loginDTO.email);
    const match = await bcrypt.compare(
      loginDTO.password,
      user._source.password,
    );

    if (!match) {
      throw new NotFoundException('Email or password is wrong');
    }

    const payload = { id: user._id, email: user._source.email };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '60m',
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '1d',
    });
    this.setCookie(response, 'refreshToken', refreshToken);

    return {
      status: 'ok',
      accessToken,
    };
  }
  private setCookie(response: Response, name: string, value: string): void {
    response.cookie(name, value, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'strict',
    });
  }
}
