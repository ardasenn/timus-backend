import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ElasticModule } from 'src/elastic/elastic.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [ElasticModule],
})
export class UserModule {}
