import { Injectable } from '@nestjs/common';
import { CreateFactoryDetailDto } from './dto/create-factory-detail.dto';
import { UpdateFactoryDetailDto } from './dto/update-factory-detail.dto';
import { DatabaseService } from 'src/database/database.service';
import { Status } from 'src/enums/status.enum';
import { InsertColumnDetailDto } from './dto/insert-colum-detail.dto';

@Injectable()
export class FactoryDetailService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createFactoryDetailDto: CreateFactoryDetailDto) {
    const now = new Date();
    const { department, dateRange, kw, price, isDiscount, factoryId } =
      createFactoryDetailDto;
    const response = await this.databaseService.query(
      'INSERT INTO "factorydetail" (department, "daterange", kw, price, "isdiscount", "factoryid","createdat","updatedat", status) VALUES($1, $2, $3, $4, $5, $6,  $7,$8,$9) RETURNING *',
      [
        department,
        dateRange,
        kw,
        price,
        isDiscount,
        factoryId,
        now,
        now,
        Status.ACTIVE,
      ],
    );
    return response.rowCount > 0 ? 'created' : 'some thing went wrong';
  }

  async findAll() {
    const response = await this.databaseService.query(
      `Select * from "factorydetail" where  status != 'PASSIVE' `,
    );
    return response.rows;
  }

  async findOne(id: number) {
    const response = await this.databaseService.query(
      `Select * from "factorydetail" where id=$1 and status != 'PASSIVE'`,
      [id],
    );
    return response.rows;
  }

  async update(id: number, updateFactoryDetailDto: UpdateFactoryDetailDto) {
    const now = new Date();
    const { department, dateRange, kw, price, isDiscount, factoryId } =
      updateFactoryDetailDto;
    const response = await this.databaseService.query(
      'UPDATE "factorydetail" SET department=$1 , "daterange"=$2, kw=$3, price=$4, "isdiscount"=$5, "factoryid"=$6,"updatedat"=$7, status=$8 where id=$9',
      [
        department,
        dateRange,
        kw,
        price,
        isDiscount,
        factoryId,
        now,
        Status.MODIFIED,
        id,
      ],
    );
    return response.rowCount > 0 ? 'uptaded' : 'some thing went wrong';
  }

  async remove(id: number) {
    const response = await this.databaseService.query(
      'UPDATE "factorydetail" SET status=$1 where id=$2',
      [Status.PASSIVE, id],
    );
    return response.rows;
  }

  async addColumn(insertColumnDetailDto: InsertColumnDetailDto) {
    return await this.databaseService.query(
      `ALTER TABLE "factorydetail" ADD COLUMN ${insertColumnDetailDto.name} ${insertColumnDetailDto.dataType};`,
    );
  }
}
