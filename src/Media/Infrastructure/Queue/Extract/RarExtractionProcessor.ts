import { Processor } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Inject, Logger } from '@nestjs/common';

import BaseProcessor from 'src/Common/Application/Abstractions/Job/BaseProcessor';
import IExtractService from 'src/Common/Application/Abstractions/Services/Extract/IExtractService';
import IApplicationEventPublisher from 'src/Common/Application/Abstractions/ApplicationPublisher/IApplicationEventPublisher';
import ApplicationEventPublisher from 'src/Common/Application/ApplicationPublisher/ApplicationEventPublisher';

import RarExtractionJobData from './RarExtractionJobData';
import RarExtractionQueueService from './RarExtractionQueueService';
import RarExtractionService, { ExtractionResult } from './RarExtractionService';
import MediaFileExtractedEvent from 'src/Media/Application/MediaFiles/MediaFileExtract/MediaFileExtractedEvent';

@Processor(RarExtractionQueueService.QueueName, { concurrency: 1 })
export default class RarExtractionProcessor extends BaseProcessor<
  RarExtractionJobData,
  ExtractionResult
> {
  constructor(
    @Inject(RarExtractionService.Token)
    private readonly rarExtractionService: IExtractService<ExtractionResult>,
    @Inject(ApplicationEventPublisher.Token)
    private readonly eventPublisher: IApplicationEventPublisher,
  ) {
    super();
  }

  async ProcessJob(job: Job<RarExtractionJobData>): Promise<ExtractionResult> {
    try {
      const extractedResult: ExtractionResult =
        await this.rarExtractionService.ExtractFile(
          job.data.SourceFileFullPath,
          job.data.DestinationFullPath,
          (progress: number) => job.updateProgress(progress),
        );

      return extractedResult;
    } catch (error) {
      Logger.log(error.message);
    }
  }

  OnJobCompletion(
    job: Job<RarExtractionJobData>,
    value: ExtractionResult,
  ): Promise<void> | void {
    const data = job.data as RarExtractionJobData;

    this.eventPublisher.Publish(
      new MediaFileExtractedEvent(
        data.MediaFileId,
        value.FilesExtracted,
        value.FilesInArchive,
        data.DestinationFullPath,
      ),
    );
  }
}
