import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { FactoryDetailService } from './factory-detail.service';
import { CreateFactoryDetailDto } from './dto/create-factory-detail.dto';
import { UpdateFactoryDetailDto } from './dto/update-factory-detail.dto';
import { CustomExceptionFilter } from 'src/custom-exception-filter/custom-exception-filter';
import { AuthGuard } from 'src/auth/auth.guard';
@Controller('factory-detail')
@UseFilters(new CustomExceptionFilter())
@UseGuards(AuthGuard)
export class FactoryDetailController {
  constructor(private readonly factoryDetailService: FactoryDetailService) {}

  @Post()
  create(@Body() createFactoryDetailDto: CreateFactoryDetailDto) {
    return this.factoryDetailService.create(createFactoryDetailDto);
  }

  @Get()
  findAll() {
    return this.factoryDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.factoryDetailService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateFactoryDetailDto: UpdateFactoryDetailDto,
  ) {
    return this.factoryDetailService.update(+id, updateFactoryDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.factoryDetailService.remove(+id);
  }
}
