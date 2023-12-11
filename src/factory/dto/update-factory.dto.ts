import { PartialType } from '@nestjs/mapped-types';
import { CreateFactoryDto } from './create-factory.dto';

export class UpdateFactoryDto extends PartialType(CreateFactoryDto) {}
