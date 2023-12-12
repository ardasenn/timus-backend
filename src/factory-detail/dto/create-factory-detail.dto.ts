import { IsDateString, Min } from 'class-validator';
export class CreateFactoryDetailDto {
  @IsDateString()
  department: Date;
  @IsDateString()
  dateRange: Date;
  @Min(0)
  kw: number;
  @Min(0)
  price: number;
  isDiscount: boolean;
  @Min(0)
  factoryId: number;
}
