import { ConfigService } from '@nestjs/config';
import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { dirname, join } from 'path';
import { UUIDTypes } from 'uuid';

import ICommandHandler from 'src/Common/Application/Abstractions/Messaging/ICommandHandler';
import IMediaFileRepository from 'src/Common/Application/Abstractions/Repositories/MediaFile/IMediaFileRepository';
import IQueueService from 'src/Common/Application/Abstractions/Services/Queue/IQueueService';
import Result from 'src/Common/Domain/Result';
import Error, { ErrorType } from 'src/Common/Domain/Error';

import MediaFile from 'src/Media/Domain/MediaFiles/MediaFile';
import MediaFileErrors from 'src/Media/Domain/MediaFiles/MediaFileErrors';

import RarExtractionQueueService from 'src/Media/Infrastructure/Queue/Extract/RarExtractionQueueService';
import MediaFileRepository from 'src/Media/Infrastructure/Persistence/Repositories/MediaFileRepository';
import RarExtractionJobData from 'src/Media/Infrastructure/Queue/Extract/RarExtractionJobData';

import MediaFileExtractCommand from './MediaFileExtractCommand';

@CommandHandler(MediaFileExtractCommand)
export default class MediaFileExtractCommandHandler
  implements ICommandHandler<MediaFileExtractCommand, UUIDTypes>
{
  constructor(
    @Inject(MediaFileRepository.Token)
    private readonly mediaFileRepository: IMediaFileRepository<MediaFile>,
    @Inject(RarExtractionQueueService.Token)
    private readonly rarExtractionQueueService: IQueueService<RarExtractionJobData>,
    @Inject() private readonly configService: ConfigService,
  ) {}

  private get ExtractedDirectoryPath() {
    return '[Extracted]';
  }

  async execute(command: MediaFileExtractCommand): Promise<Result<UUIDTypes>> {
    const mediaFileFullPath: string = (
      await this.mediaFileRepository.GetFullPathById(command.MediaFileId)
    )?.Value;

    if (!mediaFileFullPath) return Result.Failure(MediaFileErrors.NotFound);

    try {
      const job = await this.rarExtractionQueueService.AddToQueue(
        new RarExtractionJobData(
          command.MediaFileId,
          mediaFileFullPath,
          join(dirname(mediaFileFullPath), '..', this.ExtractedDirectoryPath),
        ),
      );

      return Result.Success(job.id);
    } catch (error) {
      return Result.Failure(
        new Error('MediaExtraction.Failure', error.message, ErrorType.Failure),
      );
    }
  }
}
