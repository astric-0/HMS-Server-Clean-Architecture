import { Inject } from '@nestjs/common';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { QueryHandler } from '@nestjs/cqrs';

import Result from 'src/Common/Domain/Result';
import { MediaFileFullPath } from 'src/Common/Domain/MediaFiles/ValueTypes';

import CachedQueryHandler from 'src/Common/Application/Abstractions/Messaging/CachedQueryHandler';
import IMediaFileRepository from 'src/Common/Application/Abstractions/Repositories/MediaFile/IMediaFileRepository';

import MediaFile from 'src/Media/Domain/MediaFiles/MediaFile';
import MediaFileErrors from 'src/Media/Domain/MediaFiles/MediaFileErrors';
import MediaFileRepository from 'src/Media/Infrastructure/Persistence/Repositories/MediaFileRepository';

import MediaFileGetFullPathQuery from './MediaFileGetFullPathQuery';

@QueryHandler(MediaFileGetFullPathQuery)
export default class MediaFileGetFullPathQueryHandler extends CachedQueryHandler<
  MediaFileGetFullPathQuery,
  string
> {
  constructor(
    @Inject(MediaFileRepository.Token)
    private readonly mediaFileRepository: IMediaFileRepository<MediaFile>,
    @Inject(CACHE_MANAGER)
    cacheManager: Cache,
  ) {
    super(cacheManager);
  }

  async executeCached(
    query: MediaFileGetFullPathQuery,
  ): Promise<Result<string>> {
    const mediaFileFullPath: MediaFileFullPath =
      await this.mediaFileRepository.GetFullPathById(query.Id);

    if (!mediaFileFullPath?.Value)
      return Result.Failure(MediaFileErrors.NotFound);

    return Result.Success(mediaFileFullPath.Value);
  }
}
