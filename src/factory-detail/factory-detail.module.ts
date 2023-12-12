import { Module } from '@nestjs/common';
import { FactoryDetailService } from './factory-detail.service';
import { FactoryDetailController } from './factory-detail.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [FactoryDetailController],
  providers: [FactoryDetailService],
  imports: [DatabaseModule],
})
export class FactoryDetailModule {}
