import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FactoryModule } from './factory/factory.module';
import { DatabaseModule } from './database/database.module';
import { ElasticModule } from './elastic/elastic.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { FactoryDetailModule } from './factory-detail/factory-detail.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    FactoryModule,
    DatabaseModule,
    ElasticModule,
    UserModule,
    FactoryDetailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
