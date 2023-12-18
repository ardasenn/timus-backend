import {
  IsString,
  MaxLength,
  IsEmail,
  MinLength,
  IsEnum,
  Matches,
} from 'class-validator';
import { Role } from 'src/enums/role.enum';
export class CreateUserDto {
  @IsString()
  @MaxLength(100)
  @MinLength(8)
  @Matches(/^[^\d]*$/, {
    message: 'name should not contain numeric characters',
  })
  name: string;
  @Matches(/^(?=.*[A-Z])(?=.*\d).{8,}$/, {
    message:
      'Password should  contain numeric and alphabetic characters and should have 8 charecters',
  })
  password: string;
  @IsEnum(Role)
  role: Role;
  @IsEmail()
  email: string;
}
