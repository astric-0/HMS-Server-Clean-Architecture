import { Injectable } from '@nestjs/common';
import { createWriteStream, mkdirSync, unlinkSync } from 'fs';
import { dirname } from 'path';
import * as https from 'https';

import IDownloadService from 'src/Common/Application/Abstractions/Services/Download/IDownloadService';

@Injectable()
export default class FileDownloadService implements IDownloadService {
  public static readonly Token = Symbol('FileDownloadService');

  public DownloadMedia(
    url: string,
    mediaFileFullPath: string,
    updateProgress?: (progress: number) => void,
  ): Promise<number> {
    return new Promise((resolve, reject) => {
      try {
        mkdirSync(dirname(mediaFileFullPath), { recursive: true });
      } catch (error) {
        return reject(
          `Failed to create directories for ${mediaFileFullPath}: ${error}`,
        );
      }

      const fileStream = createWriteStream(mediaFileFullPath);
      let downloadedBytes = 0;

      const request = https.get(url, (response) => {
        const totalBytes = parseInt(
          response.headers['content-length'] || '0',
          10,
        );

        response.on('data', (chunk) => {
          downloadedBytes += chunk.length;
          fileStream.write(chunk);

          const progress = Math.round((downloadedBytes / totalBytes) * 100);
          updateProgress?.(progress);
        });

        response.on('end', () => {
          fileStream.end();
          resolve(downloadedBytes);
        });

        response.on('error', (error) => {
          fileStream.close();
          unlinkSync(mediaFileFullPath);
          reject(error);
        });
      });

      request.on('error', (error) => {
        fileStream.close();
        unlinkSync(mediaFileFullPath);
        reject(error);
      });

      fileStream.on('error', (error) => {
        unlinkSync(mediaFileFullPath);
        reject(error);
      });
    });
  }
}
