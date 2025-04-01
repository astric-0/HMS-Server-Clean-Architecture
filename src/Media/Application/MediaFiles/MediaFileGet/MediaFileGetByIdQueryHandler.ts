import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

import CachedQueryHandler from 'src/Common/Application/Abstractions/Messaging/CachedQueryHandler';
import Result from 'src/Common/Domain/Result';

import MediaFileGetByIdQuery from './MediaFileGetByIdQuery';
import MediaFileInfoDto from './MediaFileInfoDto';
import MediaFileRepository from 'src/Media/Infrastructure/Persistence/Repositories/MediaFileRepository';
import MediaFileErrors from 'src/Media/Domain/MediaFiles/MediaFileErrors';
import MediaFile from 'src/Media/Domain/MediaFiles/MediaFile';
import IMediaFileRepository from 'src/Common/Application/Abstractions/Repositories/MediaFile/IMediaFileRepository';

@QueryHandler(MediaFileGetByIdQuery)
export default class MediaFileGetByIdQueryHandler extends CachedQueryHandler<
  MediaFileGetByIdQuery,
  MediaFileInfoDto
> {
  constructor(
    @Inject(MediaFileRepository.Token)
    private readonly mediaFileRepository: IMediaFileRepository<MediaFile>,
    @Inject(CACHE_MANAGER) cacheManager: Cache,
  ) {
    super(cacheManager);
  }

  async executeCached(
    query: MediaFileGetByIdQuery,
  ): Promise<Result<MediaFileInfoDto>> {
    const mediaFile = await this.mediaFileRepository.GetMediaFileById(query.Id);

    if (!mediaFile) return Result.Failure(MediaFileErrors.NotFound);

    const value = new MediaFileInfoDto(
      mediaFile.Id,
      mediaFile.Name.Value,
      mediaFile.MediaDirectory?.Id,
      mediaFile.MediaDirectory?.Name?.Value,
      mediaFile.Size.Value,
      mediaFile.Created,
    );

    const result = Result.Success<MediaFileInfoDto>(value);

    return result;
  }
}
