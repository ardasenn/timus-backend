import { Module } from '@nestjs/common';
import { ElasticService } from './elastic.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: 'https://my-dep.es.us-central1.gcp.cloud.es.io',
      auth: {
        username: 'elastic',
        password: 'uD87oBFg8Jdw2r10zfc2MwmP',
      },
    }),
  ],
  providers: [ElasticService],
  exports: [ElasticService],
})
export class ElasticModule {}
