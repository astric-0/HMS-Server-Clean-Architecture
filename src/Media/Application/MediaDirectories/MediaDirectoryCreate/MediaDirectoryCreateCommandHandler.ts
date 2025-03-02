import { UUIDTypes } from 'uuid';
import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import Result from 'src/Common/Domain/Result';
import ICommandHandler from 'src/Common/Application/Abstractions/Messaging/ICommandHandler';
import IMediaDirectoryRepository from 'src/Common/Application/Abstractions/Repositories/MediaDirectory/IMediaDirectoryRepository';
import IMediaFileRepository from 'src/Common/Application/Abstractions/Repositories/MediaFile/IMediaFileRepository';
import { MediaDirectoryName } from 'src/Common/Domain/MediaDirectory/ValueTypes';

import MediaDirectoryRepository from 'src/Media/Infrastructure/Persistence/Repositories/MediaDirectoryRepository';
import MediaDirectory from 'src/Media/Domain/MediaDirectories/MediaDirectory';
import MediaFile from 'src/Media/Domain/MediaFiles/MediaFile';
import MediaDirectoryErrors from 'src/Media/Domain/MediaDirectories/MediaDirectoryErrors';
import MediaFileRepository from 'src/Media/Infrastructure/Persistence/Repositories/MediaFileRepository';

import MediaDirectoryCreateCommand from './MediaDirectoryCreateCommand';

@CommandHandler(MediaDirectoryCreateCommand)
export default class MediaDirectoryCreateCommandHandler
  implements ICommandHandler<MediaDirectoryCreateCommand, UUIDTypes>
{
  constructor(
    @Inject(MediaDirectoryRepository.Token)
    private readonly mediaDirectoryRepository: IMediaDirectoryRepository<MediaDirectory>,
    @Inject(MediaFileRepository.Token)
    private readonly mediaFileRepository: IMediaFileRepository<MediaFile>,
  ) {}

  async execute(
    command: MediaDirectoryCreateCommand,
  ): Promise<Result<UUIDTypes>> {
    const exists =
      await this.mediaDirectoryRepository.CheckIfExistsByNameAndParent(
        new MediaDirectoryName(command.MediaDirectoryName),
        command.MediaDirectoryParentId,
      );

    if (exists) return Result.Failure(MediaDirectoryErrors.AlreadyExists);

    const parentDirectory = await this.mediaDirectoryRepository.GetById(
      command.MediaDirectoryParentId,
    );

    const childDirectories = await this.mediaDirectoryRepository.GetByIds(
      command.MediaDirectoryChildrenIds,
    );

    const mediaFiles = await this.mediaFileRepository.GetMediaFilesByIds(
      command.MediaDirectoryMediaFilesIds,
    );

    const mediaDirectory: MediaDirectory =
      await this.mediaDirectoryRepository.Save(
        MediaDirectory.Create(
          new MediaDirectoryName(command.MediaDirectoryName),
          parentDirectory,
          childDirectories,
          mediaFiles,
        ),
      );

    if (!mediaDirectory?.Id)
      return Result.Failure(MediaDirectoryErrors.FailedToCreate);

    return Result.Success(mediaDirectory.Id);
  }
}
