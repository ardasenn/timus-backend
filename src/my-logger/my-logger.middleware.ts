import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import * as format from 'date-format';
import { DatabaseService } from 'src/database/database.service';
@Injectable()
export class MyLoggerMiddleware implements NestMiddleware {
  constructor(private readonly databaseService: DatabaseService) {}
  use(req: Request, res: Response, next: NextFunction) {
    // Gets the request log
    const log = `Method : [ ${req.method} ]  -  [${format(
      'dd/MM/yyyy hh:mm:ss',
      new Date(),
    )}]  -  Url : [${req.url}]`;
    this.databaseService.query(`INSERT into "logs" (text) values($1)`, [log]);
    if (next) {
      next();
    }
  }
}
