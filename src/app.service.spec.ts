import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import * as pdf from 'pdf-parse';
import * as fs from 'fs';

jest.mock('pdf-parse');
jest.mock('fs');

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should extract text from a valid PDF file', async () => {
    const fakeText = 'Sample extracted text';
    (fs.readFileSync as jest.Mock).mockReturnValue(Buffer.from('PDF data'));
    (pdf as jest.Mock).mockResolvedValue({ text: fakeText });

    const result = await service.extractText('valid-path.pdf');
    expect(result).toBe(fakeText);
  });

  it('should handle non-PDF files gracefully', async () => {
    (fs.readFileSync as jest.Mock).mockReturnValue(Buffer.from('Not a PDF'));
    (pdf as jest.Mock).mockRejectedValue(new Error('Invalid PDF'));

    await expect(service.extractText('invalid-path.txt')).rejects.toThrow(
      'Invalid PDF',
    );
  });

  it('should return empty string for empty PDF files', async () => {
    (fs.readFileSync as jest.Mock).mockReturnValue(Buffer.from('Empty PDF'));
    (pdf as jest.Mock).mockResolvedValue({ text: '' });

    const result = await service.extractText('empty.pdf');
    expect(result).toBe('');
  });

  it('should handle corrupted PDF files', async () => {
    (fs.readFileSync as jest.Mock).mockReturnValue(Buffer.from('Corrupted PDF'));
    (pdf as jest.Mock).mockRejectedValue(new Error('Corrupted PDF'));

    await expect(service.extractText('corrupted.pdf')).rejects.toThrow(
      'Corrupted PDF',
    );
  });

  it('should extract text from large PDF files', async () => {
    const largeText = 'Large PDF content'.repeat(1000);
    (fs.readFileSync as jest.Mock).mockReturnValue(Buffer.from('Large PDF'));
    (pdf as jest.Mock).mockResolvedValue({ text: largeText });

    const result = await service.extractText('large.pdf');
    expect(result).toBe(largeText);
  });
});