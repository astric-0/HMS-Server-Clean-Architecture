import { Inject } from '@nestjs/common';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { QueryHandler } from '@nestjs/cqrs';

import Result from 'src/Common/Domain/Result';
import CachedQueryHandler from 'src/Common/Application/Abstractions/Messaging/CachedQueryHandler';
import IMediaFileRepository from 'src/Common/Application/Abstractions/Repositories/MediaFile/IMediaFileRepository';

import MediaFile from 'src/Media/Domain/MediaFiles/MediaFile';
import MediaFileRepository from 'src/Media/Infrastructure/Persistence/Repositories/MediaFileRepository';
import MediaFileGetAllQuery from './MediaFileGetAllQuery';
import MediaFileInfoDto from './MediaFileInfoDto';

@QueryHandler(MediaFileGetAllQuery)
export default class MediaFileGetAllQueryHandler extends CachedQueryHandler<
  MediaFileGetAllQuery,
  MediaFileInfoDto[]
> {
  constructor(
    @Inject(MediaFileRepository.Token)
    private mediaFileRepository: IMediaFileRepository<MediaFile>,
    @Inject(CACHE_MANAGER)
    cacheManager: Cache,
  ) {
    super(cacheManager);
  }

  public async executeCached(
    query: MediaFileGetAllQuery,
  ): Promise<Result<MediaFileInfoDto[]>> {
    const mediaFiles: MediaFile[] =
      await this.mediaFileRepository.GetMediaFiles(
        query.CurrentPage,
        query.PageSize,
      );

    const mediaFilesInfo: MediaFileInfoDto[] = mediaFiles.map(
      (fileInfo: MediaFile): MediaFileInfoDto => {
        const info: MediaFileInfoDto = {
          Id: fileInfo.Id,
          FileName: fileInfo.Name.Value,
          MediaDirectory: fileInfo.MediaDirectory?.Name?.Value,
          Size: fileInfo.Size.Value,
          Created: fileInfo.Created,
        };

        return info;
      },
    );

    return Result.Success(mediaFilesInfo);
  }
}
