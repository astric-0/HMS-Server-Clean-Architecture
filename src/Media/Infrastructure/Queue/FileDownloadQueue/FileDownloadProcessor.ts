import { Job } from 'bullmq';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Inject, Logger } from '@nestjs/common';
import { unlinkSync, createWriteStream, mkdirSync } from 'fs';
import { dirname } from 'path';
import * as https from 'https';
import * as extractFrame from 'ffmpeg-extract-frame';

import IApplicationEventPublisher from 'src/Common/Application/Abstractions/ApplicationPublisher/IApplicationEventPublisher';
import ApplicationEventPublisher from 'src/Common/Application/ApplicationPublisher/ApplicationEventPublisher';
import MediaFileDownloadedEvent from 'src/Media/Application/MediaFiles/MediaFileDownload/MediaFIleDownloadedEvent';

import FileDownloadQueueService from './FileDownloadQueueService';
import FileDownloadJobData from './FileDownloadJobData';

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

      const totalSize = await FileDownloadProcessor.DownloadMedia(job);
      await FileDownloadProcessor.CreateThumbnail(
        job.data.MediaFileFullPath,
        job.data.MediaThumbnailFileFullPath,
      );

      this.eventPublisher.Publish(
        new MediaFileDownloadedEvent(
          job.data.MediaFileName,
          job.data.MediaDirectoryId,
          job.data.MediaFileFullPath,
          job.data.MediaThumbnailFileFullPath,
          totalSize,
        ),
      );
    } catch (error) {
      Logger.log(error);
    } finally {
      Logger.log('JOB ENDED');
    }
  }

  private static DownloadMedia(job: Job<FileDownloadJobData>): Promise<number> {
    return new Promise((resolve, reject) => {
      const { data } = job;
      try {
        mkdirSync(dirname(data.MediaFileFullPath), { recursive: true });
      } catch (error) {
        return reject(
          `Failed to create directories for ${data.MediaFileFullPath}: ${error}`,
        );
      }

      const fileStream = createWriteStream(data.MediaFileFullPath);
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
          resolve(downloadedBytes);
        });

        response.on('error', (error) => {
          fileStream.close();
          unlinkSync(data.MediaFileFullPath);
          reject(error);
        });
      });

      request.on('error', (error) => {
        fileStream.close();
        unlinkSync(data.MediaFileFullPath);
        reject(error);
      });

      fileStream.on('error', (error) => {
        unlinkSync(data.MediaFileFullPath);
        reject(error);
      });
    });
  }

  private static async CreateThumbnail(
    mediaFileFullPath: string,
    thumbnailFileFullPath: string,
    offset: number = 10,
  ): Promise<void> {
    mkdirSync(dirname(thumbnailFileFullPath), { recursive: true });

    await extractFrame({
      input: mediaFileFullPath,
      output: thumbnailFileFullPath,
      offset,
    });
  }
}
