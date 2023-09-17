import { Test, TestingModule } from '@nestjs/testing';
import { BookingEntryService } from './booking-entry.service';

describe('BookingEntryService', () => {
  let service: BookingEntryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingEntryService],
    }).compile();

    service = module.get<BookingEntryService>(BookingEntryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
