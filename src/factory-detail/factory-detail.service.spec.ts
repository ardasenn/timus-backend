import { Test, TestingModule } from '@nestjs/testing';
import { FactoryDetailService } from './factory-detail.service';

describe('FactoryDetailService', () => {
  let service: FactoryDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FactoryDetailService],
    }).compile();

    service = module.get<FactoryDetailService>(FactoryDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
