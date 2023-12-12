import { PartialType } from '@nestjs/mapped-types';
import { CreateFactoryDetailDto } from './create-factory-detail.dto';

export class UpdateFactoryDetailDto extends PartialType(CreateFactoryDetailDto) {}
