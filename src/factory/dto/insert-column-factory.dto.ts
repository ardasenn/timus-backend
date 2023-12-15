import { IsString, IsEnum } from 'class-validator';
import { PostgresDataTypes } from 'src/enums/dataType.enum';
export class InsertColumnFactoryDto {
  @IsString()
  name: string;
  @IsEnum(PostgresDataTypes)
  dataType: PostgresDataTypes;
}
