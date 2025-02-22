import { Job } from 'bullmq';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { unlinkSync, createWriteStream, mkdirSync } from 'fs';
import { dirname } from 'path';
import * as https from 'https';

import DownloadFileQueueService from './DownloadFileQueueService';
import DownloadFileJobData from './DownloadFileJobData';

@Processor(DownloadFileQueueService.QueueName, { concurrency: 1 })
export default class DownloadFileProcessor extends WorkerHost {
  async process(job: Job): Promise<void> {
    try {
      Logger.log(`JOB STARTED: ${job.name}`);
      Logger.log(`JOB DATA: ${JSON.stringify(job.data)}`);

      await this.downloadMedia(job);
    } catch (error) {
      Logger.log(error);
    } finally {
      Logger.log('JOB ENDED');
    }
  }

  private downloadMedia(job: Job<DownloadFileJobData>): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const { data } = job;
      try {
        mkdirSync(dirname(data.FullPath), { recursive: true });
      } catch (error) {
        return reject(
          `Failed to create directories for ${data.FullPath}: ${error}`,
        );
      }

      const fileStream = createWriteStream(data.FullPath);
      let downloadedBytes = 0;

      const request = https.get(data.URL, (response) => {
        const totalBytes = parseInt(
          response.headers['content-length'] || '0',
          10,
        );

        response.on('data', (chunk) => {
          downloadedBytes += chunk.length;
          fileStream.write(chunk);

          const progress = Math.round((downloadedBytes / totalBytes) * 100);
          job.updateProgress(progress);
        });

        response.on('end', () => {
          fileStream.end();
          resolve(true);
        });

        response.on('error', (error) => {
          fileStream.close();
          unlinkSync(data.FullPath);
          reject(error);
        });
      });

      request.on('error', (error) => {
        fileStream.close();
        unlinkSync(data.FullPath);
        reject(error);
      });

      fileStream.on('error', (error) => {
        unlinkSync(data.FullPath);
        reject(error);
      });
    });
  }
}
