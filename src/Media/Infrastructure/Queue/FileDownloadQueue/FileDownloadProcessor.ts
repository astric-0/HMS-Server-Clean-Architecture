import { Job } from 'bullmq';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Inject, Logger } from '@nestjs/common';
import { unlinkSync, createWriteStream, mkdirSync } from 'fs';
import { dirname } from 'path';
import * as https from 'https';

import FileDownloadQueueService from './FileDownloadQueueService';
import FileDownloadJobData from './FileDownloadJobData';
import IApplicationEventPublisher from 'src/Common/Application/Abstractions/ApplicationPublisher/IApplicationEventPublisher';
import ApplicationEventPublisher from 'src/Common/Application/ApplicationPublisher/ApplicationEventPublisher';
import MediaFileDownloadedEvent from 'src/Media/Application/MediaFiles/MediaFileDownload/MediaFIleDownloadedEvent';

@Processor(FileDownloadQueueService.QueueName, { concurrency: 1 })
export default class FileDownloadProcessor extends WorkerHost {
  constructor(
    @Inject(ApplicationEventPublisher.Token)
    private readonly eventPublisher: IApplicationEventPublisher,
  ) {
    super();
  }

  async process(job: Job<FileDownloadJobData>): Promise<void> {
    try {
      Logger.log(`JOB STARTED: ${job.name}`);
      Logger.log(`JOB DATA: ${JSON.stringify(job.data)}`);

      const totalSize = await this.downloadMedia(job);

      this.eventPublisher.Publish(
        new MediaFileDownloadedEvent(
          job.data.MediaFileName,
          job.data.MasterDirectory,
          job.data.FullPath,
          totalSize,
        ),
      );
    } catch (error) {
      Logger.log(error);
    } finally {
      Logger.log('JOB ENDED');
    }
  }

  private downloadMedia(job: Job<FileDownloadJobData>): Promise<number> {
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
          resolve(totalBytes);
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
