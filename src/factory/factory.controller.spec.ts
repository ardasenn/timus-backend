import { Test, TestingModule } from '@nestjs/testing';
import { FactoryController } from './factory.controller';
import { FactoryService } from './factory.service';

describe('FactoryController', () => {
  let controller: FactoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FactoryController],
      providers: [FactoryService],
    }).compile();

    controller = module.get<FactoryController>(FactoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
