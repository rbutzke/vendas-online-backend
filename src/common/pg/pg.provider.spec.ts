import { Test, TestingModule } from '@nestjs/testing';
import { Pg } from './pg.provider';

describe('Pg', () => {
  let provider: Pg;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Pg],
    }).compile();

    provider = module.get<Pg>(Pg);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
