import { Controller, Get, Post, Render, Req, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getUploadForm() {
    return;
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('pdf', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'application/pdf') {
          req.fileValidationError = 'Only PDF files are allowed';
          return cb(null, false);
        }
        cb(null, true);
      },
      limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
    }),
  )
  @Render('result')
  async handleFileUpload(
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (!file) {
      throw new BadRequestException('File is required');
    }
    const text = await this.appService.extractText(file.path);
    return { text };
  }
}
