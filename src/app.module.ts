import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FactoryModule } from './factory/factory.module';
import { DatabaseModule } from './database/database.module';
import { ElasticModule } from './elastic/elastic.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { FactoryDetailModule } from './factory-detail/factory-detail.module';
import { AuthModule } from './auth/auth.module';
import { MyLoggerMiddleware } from './my-logger/my-logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    FactoryModule,
    DatabaseModule,
    ElasticModule,
    UserModule,
    FactoryDetailModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MyLoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
