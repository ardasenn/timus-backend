import { Test, TestingModule } from '@nestjs/testing';
import { FactoryDetailController } from './factory-detail.controller';
import { FactoryDetailService } from './factory-detail.service';

describe('FactoryDetailController', () => {
  let controller: FactoryDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FactoryDetailController],
      providers: [FactoryDetailService],
    }).compile();

    controller = module.get<FactoryDetailController>(FactoryDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
