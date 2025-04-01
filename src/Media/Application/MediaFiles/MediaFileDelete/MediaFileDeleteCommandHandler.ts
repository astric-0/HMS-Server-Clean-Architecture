import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';

import Result from 'src/Common/Domain/Result';
import ICommandHandler from 'src/Common/Application/Abstractions/Messaging/ICommandHandler';
import IMediaFileRepository from 'src/Common/Application/Abstractions/Repositories/MediaFile/IMediaFileRepository';

import MediaFile from 'src/Media/Domain/MediaFiles/MediaFile';
import MediaFileErrors from 'src/Media/Domain/MediaFiles/MediaFileErrors';
import MediaFileRepository from 'src/Media/Infrastructure/Persistence/Repositories/MediaFileRepository';

import MediaFileDeleteCommand from './MediaFileDeleteCommand';

@CommandHandler(MediaFileDeleteCommand)
export default class MediaFileDeleteCommandHandler
  implements ICommandHandler<MediaFileDeleteCommand, void>
{
  constructor(
    @Inject(MediaFileRepository.Token)
    private readonly mediaFileRepository: IMediaFileRepository<MediaFile>,
  ) {}

  async execute(command: MediaFileDeleteCommand): Promise<Result<void>> {
    const mediaFile: MediaFile =
      await this.mediaFileRepository.GetMediaFileById(command.MediaFileId);

    if (!mediaFile) return Result.Failure(MediaFileErrors.NotFound);

    const deleted: boolean = await this.mediaFileRepository.RemoveById(
      mediaFile.Id,
    );

    if (!deleted)
      return Result.Failure(MediaFileErrors.UnableToDeleteMediaFile);

    return Result.Success();
  }
}
