import {
  IsString,
  IsDateString,
  IsNotEmpty,
  MaxLength,
  Min,
} from 'class-validator';
export class CreateFactoryDto {
  @IsDateString()
  @IsNotEmpty()
  subscription: Date;
  @IsDateString()
  @IsNotEmpty()
  endOfSubscription: Date;
  @IsString()
  @MaxLength(200)
  name: string;
  @Min(0)
  employeeCount: number;
  isFree: boolean;
}
