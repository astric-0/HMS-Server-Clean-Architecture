import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandHandler } from '@nestjs/cqrs';
import { dirname, join, basename, extname } from 'path';

import { MediaThumbnailFullPath } from 'src/Common/Domain/MediaFiles/ValueTypes';
import Result from 'src/Common/Domain/Result';

import ICommandHandler from 'src/Common/Application/Abstractions/Messaging/ICommandHandler';
import IThumbnailService from 'src/Common/Application/Abstractions/Services/Thumbnail/IThumbnailService';
import IMediaFileRepository from 'src/Common/Application/Abstractions/Repositories/MediaFile/IMediaFileRepository';

import ThumbnailService from 'src/Media/Infrastructure/Services/Thumbnail/ThumbnailService';
import MediaFileRepository from 'src/Media/Infrastructure/Persistence/Repositories/MediaFileRepository';

import MediaFile from 'src/Media/Domain/MediaFiles/MediaFile';
import MediaFileErrors from 'src/Media/Domain/MediaFiles/MediaFileErrors';

import MediaFileCreateThumbnailCommand from './MediaFileCreateThumbnailCommand';

@CommandHandler(MediaFileCreateThumbnailCommand)
export default class MediaFileCreateThumbnailCommandHandler
  implements ICommandHandler<MediaFileCreateThumbnailCommand, void>
{
  private readonly AllowedVideoFormats: string[];

  constructor(
    @Inject(ThumbnailService.Token)
    private readonly thumbnailService: IThumbnailService,
    @Inject(MediaFileRepository.Token)
    private readonly mediaFileRepository: IMediaFileRepository<MediaFile>,
    @Inject()
    configService: ConfigService,
  ) {
    this.AllowedVideoFormats =
      configService.get('ALLOWED_VIDEO_FORMATS')?.split(',') || [];
  }

  async execute(
    command: MediaFileCreateThumbnailCommand,
  ): Promise<Result<void>> {
    const mediaFile = await this.mediaFileRepository.GetMediaFileById(
      command.MediaFileId,
    );

    if (!mediaFile) return Result.Failure(MediaFileErrors.NotFound);

    if (mediaFile.ThumbnailFullPath?.Value)
      await this.thumbnailService.Remove(mediaFile.ThumbnailFullPath.Value);

    const oldThumbnailFullPath = mediaFile.ThumbnailFullPath?.Value;
    const mediaFileFullPath: string = mediaFile.FullPath.Value;
    const thumbnailFileFullPath: string =
      command.FullPath ||
      mediaFile.ThumbnailFullPath?.Value ||
      join(
        dirname(mediaFileFullPath),
        basename(mediaFileFullPath, extname(mediaFileFullPath)),
        '[Thumbnail]',
      );

    if (!mediaFileFullPath) return Result.Failure(MediaFileErrors.PathNotFound);

    if (!this.IsExtensionAllowed(extname(mediaFileFullPath)))
      return Result.Failure(MediaFileErrors.InvalidVideoExtension);

    try {
      await this.thumbnailService.Create(
        mediaFileFullPath,
        thumbnailFileFullPath,
        command.OffSet,
      );
    } catch {
      return Result.Failure(MediaFileErrors.ThumbnailNotCreated);
    }

    mediaFile.UpdateThumbnailFullPath(
      new MediaThumbnailFullPath(thumbnailFileFullPath),
    );

    if (
      oldThumbnailFullPath != mediaFile.ThumbnailFullPath.Value &&
      (await this.mediaFileRepository.Update(mediaFile.Id, {
        ThumbnailFullPath: mediaFile.ThumbnailFullPath,
      }))
    )
      return Result.Failure(MediaFileErrors.ThumbnailNotSavedInDB);

    return Result.Success();
  }

  private IsExtensionAllowed(extension: string): boolean {
    return this.AllowedVideoFormats.includes(extension);
  }
}
