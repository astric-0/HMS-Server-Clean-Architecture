import * as fs from 'fs';
import { Response } from 'express';
import { Injectable } from '@nestjs/common';

import IStreamService from 'src/Common/Application/Abstractions/Services/Stream/IStreamService';

@Injectable()
export default class FileStreamService implements IStreamService {
  public static readonly Token: symbol = Symbol('FileStreamService');

  public async Stream(
    filePath: string,
    response: Response,
    range: string,
  ): Promise<void> {
    const stat = await fs.promises.stat(filePath);
    const fileSize = stat.size;

    if (range) {
      const [start, end] = this.ParseRange(range, fileSize);
      response.writeHead(206, this.GetHeaders(start, end, fileSize));
      fs.createReadStream(filePath, { start, end }).pipe(response);
    } else {
      response.writeHead(200, this.GetHeaders(0, fileSize - 1, fileSize));
      fs.createReadStream(filePath).pipe(response);
    }
  }

  private ParseRange(range: string, fileSize: number): [number, number] {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    return [start, end];
  }

  private GetHeaders(
    start: number,
    end: number,
    fileSize: number,
  ): Record<string, number | string> {
    return {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': end - start + 1,
      'Content-Type': 'video/mp4',
    };
  }
}
