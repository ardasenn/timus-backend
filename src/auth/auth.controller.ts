import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  async signin(
    @Body() loginDTO: LoginDto,
    @Res() response: Response,
  ): Promise<any> {
    const result = await this.authService.signIn(loginDTO, response);
    return response.status(200).json(result);
  }
}
