import { Test, TestingModule } from '@nestjs/testing';
import { ContractorsResolver } from './contractors.resolver';

describe('ContractorsResolver', () => {
  let resolver: ContractorsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContractorsResolver],
    }).compile();

    resolver = module.get<ContractorsResolver>(ContractorsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
