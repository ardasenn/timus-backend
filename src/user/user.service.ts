import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ElasticService } from 'src/elastic/elastic.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly elasticService: ElasticService) {}
  async create(createUserDto: CreateUserDto) {
    const isEmailUsed = await this.getbyEmail(createUserDto.email);
    console.log(isEmailUsed, 'email');
    if (isEmailUsed) throw new UnauthorizedException('Email is already taken');
    const hashedPwd = await bcrypt.hash(createUserDto.password, 10);
    const user = {
      createTime: Date.now(),
      ...createUserDto,
      password: hashedPwd,
    };
    return await this.elasticService.create('users', user);
  }

  async findAll() {
    const response = await this.elasticService.getAll();
    return response.hits.hits;
  }

  async findOne(id: string) {
    const response = await this.elasticService.findById('users', id);
    return response;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = {
      updateTime: Date.now(),
      ...updateUserDto,
    };

    return await this.elasticService.update('users', id, user);
  }

  async remove(id: string) {
    return await this.elasticService.delete('users', id);
  }
  async getbyEmail(email: string) {
    const result = await this.elasticService.search('users', {
      match: { email: email },
    });
    const response = result.hits.hits.filter(
      (item) => item._source.email === email,
    );
    return response[0];
  }
}
