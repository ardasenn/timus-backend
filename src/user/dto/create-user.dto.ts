import {
  IsString,
  MaxLength,
  IsEmail,
  MinLength,
  IsEnum,
} from 'class-validator';
import { Role } from 'src/enums/role.enum';
export class CreateUserDto {
  @IsString()
  @MaxLength(100)
  name: string;
  @IsString()
  @MaxLength(1000)
  @MinLength(3)
  password: string;
  @IsEnum(Role)
  role: Role;
  @IsEmail()
  email: string;
}
