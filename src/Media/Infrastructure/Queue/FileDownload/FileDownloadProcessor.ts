import { Job } from 'bullmq';
import { Processor } from '@nestjs/bullmq';
import { Inject, Logger } from '@nestjs/common';
import { join } from 'path';

import IApplicationEventPublisher from 'src/Common/Application/Abstractions/ApplicationPublisher/IApplicationEventPublisher';
import ApplicationEventPublisher from 'src/Common/Application/ApplicationPublisher/ApplicationEventPublisher';
import IDownloadService from 'src/Common/Application/Abstractions/Services/Download/IDownloadService';
import BaseProcessor from 'src/Common/Application/Abstractions/Job/BaseProcessor';

import MediaFileDownloadedEvent from 'src/Media/Application/MediaFiles/MediaFileDownload/MediaFileDownloadedEvent';

import FileDownloadQueueService from './FileDownloadQueueService';
import FileDownloadJobData from './FileDownloadJobData';
import FileDownloadService from './FileDownloadService';

@Processor(FileDownloadQueueService.QueueName, { concurrency: 1 })
export default class FileDownloadProcessor extends BaseProcessor<
  FileDownloadJobData,
  [number, string]
> {
  constructor(
    @Inject(ApplicationEventPublisher.Token)
    private readonly eventPublisher: IApplicationEventPublisher,
    @Inject(FileDownloadService.Token)
    private readonly fileDownloadService: IDownloadService,
  ) {
    super();
  }

  async ProcessJob(job: Job<FileDownloadJobData>): Promise<[number, string]> {
    try {
      const mediaFileFullPath: string = join(
        job.data.MediaFilePath,
        job.data.MediaFileName,
      );

      const totalSize = await this.fileDownloadService.DownloadMedia(
        job.data.URL,
        mediaFileFullPath,
        (value) => job.updateProgress(value),
      );

      return [totalSize, mediaFileFullPath];
    } catch (error) {
      Logger.error(error);
    }
  }

  public OnJobCompletion(
    job: Job<FileDownloadJobData, any, string>,
    [totalSize, mediaFileFullPath]: [number, string],
  ): void {
    this.eventPublisher.Publish(
      new MediaFileDownloadedEvent(
        job.data.MediaFileName,
        job.data.MediaDirectoryId,
        mediaFileFullPath,
        totalSize,
      ),
    );
  }
}
