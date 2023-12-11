import { Injectable } from '@nestjs/common';
import { Pool, PoolClient, QueryResult } from 'pg';

@Injectable()
export class DatabaseService {
  private readonly pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        require: false,
      },
    });
  }

  async query(queryText: string, values?: any[]): Promise<QueryResult> {
    const client: PoolClient = await this.pool.connect();
    try {
      const result = await client.query(queryText, values);
      return result;
    } finally {
      client.release();
    }
  }
}
