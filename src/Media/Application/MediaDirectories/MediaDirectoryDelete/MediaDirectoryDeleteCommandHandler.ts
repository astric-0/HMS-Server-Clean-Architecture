import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';

import Result from 'src/Common/Domain/Result';
import IMediaDirectoryRepository from 'src/Common/Application/Abstractions/Repositories/MediaDirectory/IMediaDirectoryRepository';
import ICommandHandler from 'src/Common/Application/Abstractions/Messaging/ICommandHandler';

import MediaDirectory from 'src/Media/Domain/MediaDirectories/MediaDirectory';
import MediaDirectoryErrors from 'src/Media/Domain/MediaDirectories/MediaDirectoryErrors';
import MediaDirectoryRepository from 'src/Media/Infrastructure/Persistence/Repositories/MediaDirectoryRepository';

import MediaDirectoryDeleteCommand from './MediaDirectoryDeleteCommand';

@CommandHandler(MediaDirectoryDeleteCommand)
export default class MediaDirectoryDeleteCommandHandler
  implements ICommandHandler<MediaDirectoryDeleteCommand, void>
{
  constructor(
    @Inject(MediaDirectoryRepository.Token)
    private readonly mediaDirectoryRepository: IMediaDirectoryRepository<MediaDirectory>,
  ) {}

  async execute(command: MediaDirectoryDeleteCommand): Promise<Result<void>> {
    const mediaDirectory: MediaDirectory =
      await this.mediaDirectoryRepository.GetById(command.MediaDirectoryId);

    if (!mediaDirectory) return Result.Failure(MediaDirectoryErrors.NotFound);

    if (!(await this.mediaDirectoryRepository.Remove(mediaDirectory)))
      return Result.Failure(MediaDirectoryErrors.FailedToDelete);

    return Result.Success();
  }
}
