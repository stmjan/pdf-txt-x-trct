import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';
import * as pdfParse from 'pdf-parse';

@Injectable()
export class AppService {
  async extractText(filePath: string): Promise<string> {
    try {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      return data.text;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    } finally {
      this.deleteFile(filePath);
    }
  }

  async deleteFile(filePath: string) {
    try {
      await fs.promises.unlink(filePath);
      console.log(`Successfully deleted file ${filePath}`);
    } catch (err) {
      console.error(`Error deleting file ${filePath}:`, err.message);
    }
  }
}