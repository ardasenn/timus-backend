import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ElasticService } from 'src/elastic/elastic.service';

@Injectable()
export class UserService {
  constructor(private readonly elasticService: ElasticService) {}
  async create(createUserDto: CreateUserDto) {
    const user = {
      createTime: Date.now(),
      ...createUserDto,
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
}
