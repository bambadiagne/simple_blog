import { Test, TestingModule } from '@nestjs/testing';
import { CodeVerificationService } from './code-verification.service';

describe('CodeVerificationService', () => {
  let service: CodeVerificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CodeVerificationService],
    }).compile();

    service = module.get<CodeVerificationService>(CodeVerificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
