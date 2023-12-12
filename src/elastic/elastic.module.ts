import { Module } from '@nestjs/common';
import { ElasticService } from './elastic.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    ElasticsearchModule.register({
      node: process.env.ELASTIC_NODE,
      auth: {
        username: process.env.ELASTIC_AUTH_USERNAME,
        password: process.env.ELASTIC_AUTH_PASSWORD,
      },
    }),
  ],
  providers: [ElasticService],
  exports: [ElasticService],
})
export class ElasticModule {}
