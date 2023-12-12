import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
@Injectable()
export class ElasticService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async create(index: string = 'users', body: any): Promise<any> {
    return this.elasticsearchService.index({
      index,
      body,
    });
  }

  async update(index: string = 'users', id: string, body: any): Promise<any> {
    return this.elasticsearchService.update({
      index,
      id,
      body: {
        doc: body,
      },
    });
  }

  async delete(index: string = 'users', id: string): Promise<any> {
    return this.elasticsearchService.deleteByQuery({
      index,
      body: {
        query: {
          match: { _id: id },
        },
      },
    });
  }

  async findById(index: string = 'users', id: string): Promise<any> {
    return this.elasticsearchService.get({
      index,
      id,
    });
  }

  async search(index: string = 'users', query: any): Promise<any> {
    const document = {
      index,
      body: {
        query,
      },
    };

    return await this.elasticsearchService.search(document);
  }
  async getAll(index: string = 'users'): Promise<any> {
    return this.elasticsearchService.search({
      index,
      body: {
        query: {
          match_all: {},
        },
      },
    });
  }
}
