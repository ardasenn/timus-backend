import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  signin(@Body() loginDTO: LoginDto) {
    return this.authService.signIn(loginDTO);
  }
  @Post()
  fetchMe(@Body() refreshToken: string) {
    return this.authService.fetchMe(refreshToken);
  }
}
