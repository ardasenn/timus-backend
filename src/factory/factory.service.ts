import { Injectable } from '@nestjs/common';
import { CreateFactoryDto } from './dto/create-factory.dto';
import { UpdateFactoryDto } from './dto/update-factory.dto';
import { DatabaseService } from 'src/database/database.service';
import { Status } from 'src/enums/status.enum';
import { InsertColumnFactoryDto } from './dto/insert-column-factory.dto';

@Injectable()
export class FactoryService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createFactoryDto: CreateFactoryDto) {
    const now = new Date();
    const { name, subscription, endOfSubscription, employeeCount, isFree } =
      createFactoryDto;
    const response = await this.databaseService.query(
      'INSERT INTO "Factory" (name, subscription, "endOfSubscription", "employeeCount", "isFree", "createdAt","updatedAt", status) VALUES($1, $2, $3, $4, $5, $6,  $7,$8) RETURNING *',
      [
        name,
        subscription,
        endOfSubscription,
        employeeCount,
        isFree,
        now,
        now,
        Status.ACTIVE,
      ],
    );
    return response.rowCount > 0 ? 'created' : 'some thing went wrong';
  }

  async findAll() {
    const response = await this.databaseService.query(
      `Select * from "Factory" where  status != 'PASSIVE' `,
    );
    return response.rows;
  }

  async findOne(id: number) {
    const response = await this.databaseService.query(
      `Select * from "Factory" where id=$1 and status != 'PASSIVE'`,
      [id],
    );
    return response.rows;
  }

  async update(id: number, updateFactoryDto: UpdateFactoryDto) {
    const now = new Date();
    const { name, subscription, endOfSubscription, employeeCount, isFree } =
      updateFactoryDto;

    const response = await this.databaseService.query(
      'UPDATE "Factory" SET name=$1 ,  subscription=$2 , "endOfSubscription"=$3, "employeeCount"=$4, "isFree"=$5,"updatedAt"=$6, status=$7 where id=$8',
      [
        name,
        subscription,
        endOfSubscription,
        employeeCount,
        isFree,
        now,
        Status.MODIFIED,
        id,
      ],
    );
    return response.rowCount > 0 ? 'uptaded' : 'some thing went wrong';
  }

  async remove(id: number) {
    const response = await this.databaseService.query(
      'UPDATE "Factory" SET status=$1 where id=$2',
      [Status.PASSIVE, id],
    );
    return response.rows;
  }
  async addColumn(insertColumnFactoryDto: InsertColumnFactoryDto) {
    return await this.databaseService.query(
      `ALTER TABLE "Factory" ADD COLUMN ${insertColumnFactoryDto.name} ${insertColumnFactoryDto.dataType};`,
    );
  }
}
