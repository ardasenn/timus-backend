import {
  IsDateString,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
export class CreateFactoryDetailDto {
  @IsString()
  @MaxLength(200)
  department: string;
  @IsDateString()
  dateRange: Date;
  @Min(0)
  kw: number;
  @Min(0)
  price: number;
  @IsNotEmpty()
  isDiscount: boolean;
  @Min(0)
  factoryId: number;
}
