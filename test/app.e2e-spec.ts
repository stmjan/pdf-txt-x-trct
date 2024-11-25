import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

describe('AppController (e2e)', () => {
  let app;
  jest.setTimeout(30000);
  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
        imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestExpressApplication>();

    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('hbs');

    await app.init();
});

  afterAll(async () => {
    await app.close();
  });

  it('GET / should render upload form', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect(/Upload a PDF File/);
  });

  it('POST /upload with valid PDF should extract text', () => {
    return request(app.getHttpServer())
      .post('/upload')
      .attach('pdf', 'test/sample.pdf')
      .expect(201)
      .expect(/Extracted Text:/);
  });

  it('POST /upload with non-PDF file should return error', () => {
    return request(app.getHttpServer())
      .post('/upload')
      .attach('pdf', 'test/invalid.txt')
      .expect(400)
      .expect(/Only PDF files are allowed/);
  });

  it('POST /upload with no file should return error', () => {
    return request(app.getHttpServer())
      .post('/upload')
      .expect(400);
  });

  it('POST /upload with corrupted PDF should handle error', () => {
    return request(app.getHttpServer())
      .post('/upload')
      .attach('pdf', 'test/corrupted.pdf')
      .expect(500);
  });

  it('POST /upload with large PDF should return error', () => {
    return request(app.getHttpServer())
      .post('/upload')
      .attach('pdf', 'test/large.pdf')
      .expect(413);
  });

  it('POST /upload with disallowed file type should return error', () => {
    return request(app.getHttpServer())
      .post('/upload')
      .attach('pdf', 'test/malicious.exe')
      .expect(400);
  });
});