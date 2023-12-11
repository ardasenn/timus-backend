import { Module } from '@nestjs/common';
import { FactoryService } from './factory.service';
import { FactoryController } from './factory.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [FactoryController],
  providers: [FactoryService],
  imports: [DatabaseModule],
})
export class FactoryModule {}
