import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FactoryModule } from './factory/factory.module';
import { DatabaseModule } from './database/database.module';
import { ElasticModule } from './elastic/elastic.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [FactoryModule, DatabaseModule, ElasticModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
