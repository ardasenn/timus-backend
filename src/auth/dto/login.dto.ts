import { IsString, MaxLength, IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @MaxLength(1000)
  @MinLength(3)
  password: string;
  @IsEmail()
  email: string;
}
