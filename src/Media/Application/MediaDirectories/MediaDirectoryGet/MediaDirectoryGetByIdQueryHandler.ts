import { Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

import IMediaDirectoryRepository from 'src/Common/Application/Abstractions/Repositories/MediaDirectory/IMediaDirectoryRepository';
import CachedQueryHandler from 'src/Common/Application/Abstractions/Messaging/CachedQueryHandler';

import MediaDirectoryRepository from 'src/Media/Infrastructure/Persistence/Repositories/MediaDirectoryRepository';
import MediaDirectory from 'src/Media/Domain/MediaDirectories/MediaDirectory';

import { MediaDirectoryInfoDto } from './MediaDirectoryInfoDto';
import { MediaDirectoryGetByIdQuery } from './MediaDirectoryGetByIdQuery';
import Result from 'src/Common/Domain/Result';
import MediaDirectoryErrors from 'src/Media/Domain/MediaDirectories/MediaDirectoryErrors';
import MediaFile from 'src/Media/Domain/MediaFiles/MediaFile';
import MediaFileInfoDto from '../../MediaFiles/MediaFileGet/MediaFileInfoDto';

@QueryHandler(MediaDirectoryGetByIdQuery)
export default class MediaDirectoryGetByIdQueryHandler extends CachedQueryHandler<
  MediaDirectoryGetByIdQuery,
  MediaDirectoryInfoDto
> {
  constructor(
    @Inject(MediaDirectoryRepository.Token)
    private mediaFileRepository: IMediaDirectoryRepository<MediaDirectory>,
    @Inject(CACHE_MANAGER)
    cacheManager: Cache,
  ) {
    super(cacheManager);
  }

  async executeCached(
    query: MediaDirectoryGetByIdQuery,
  ): Promise<Result<MediaDirectoryInfoDto>> {
    const mediaDirectory: MediaDirectory =
      await this.mediaFileRepository.GetById(query.Id);

    if (!mediaDirectory) return Result.Failure(MediaDirectoryErrors.NotFound);

    return Result.Success(
      MediaDirectoryGetByIdQueryHandler.MapMediaDirectoryInfoToDto(
        mediaDirectory,
      ),
    );
  }

  static MapMediaDirectoryInfoToDto(
    mediaDirectory: MediaDirectory,
  ): MediaDirectoryInfoDto {
    if (!mediaDirectory) return null;

    return new MediaDirectoryInfoDto(
      mediaDirectory.Id,
      mediaDirectory.Created,
      mediaDirectory.Name.Value,
      MediaDirectoryGetByIdQueryHandler.MapMediaDirectoryInfoToDto(
        mediaDirectory.Parent,
      ),
      mediaDirectory.Children?.map(
        MediaDirectoryGetByIdQueryHandler.MapMediaDirectoryInfoToDto,
      ),
      mediaDirectory.MediaFiles?.map(
        (value: MediaFile): MediaFileInfoDto =>
          new MediaFileInfoDto(
            value.Id,
            value.Name.Value,
            value?.MediaDirectory?.Id,
            value?.MediaDirectory?.Name?.Value,
            value.Size.Value,
            value.Created,
          ),
      ),
    );
  }
}
