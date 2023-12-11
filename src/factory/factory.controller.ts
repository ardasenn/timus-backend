import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { FactoryService } from './factory.service';
import { CreateFactoryDto } from './dto/create-factory.dto';
import { UpdateFactoryDto } from './dto/update-factory.dto';

@Controller('factory')
export class FactoryController {
  constructor(private readonly factoryService: FactoryService) {}

  @Post()
  async create(@Body() createFactoryDto: CreateFactoryDto) {
    return await this.factoryService.create(createFactoryDto);
  }

  @Get()
  async findAll() {
    return await this.factoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.factoryService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFactoryDto: UpdateFactoryDto,
  ) {
    return await this.factoryService.update(+id, updateFactoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.factoryService.remove(+id);
  }
}
