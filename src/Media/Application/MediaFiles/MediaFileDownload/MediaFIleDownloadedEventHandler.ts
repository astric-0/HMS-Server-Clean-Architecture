import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import {
  MediaFileFullPath,
  MediaFileName,
  MediaFileSize,
} from 'src/Common/Domain/MediaFiles/ValueTypes';
import IMediaFileRepository from 'src/Common/Application/Abstractions/Repositories/MediaFile/IMediaFileRepository';
import IMediaDirectoryRepository from 'src/Common/Application/Abstractions/Repositories/MediaDirectory/IMediaDirectoryRepository';

import MediaFile from 'src/Media/Domain/MediaFiles/MediaFile';
import MediaDirectory from 'src/Media/Domain/MediaDirectories/MediaDirectory';

import MediaFileRepository from 'src/Media/Infrastructure/Persistence/Repositories/MediaFileRepository';
import MediaDirectoryRepository from 'src/Media/Infrastructure/Persistence/Repositories/MediaDirectoryRepository';

import MediaFileDownloadedEvent from './MediaFIleDownloadedEvent';

@EventsHandler(MediaFileDownloadedEvent)
export default class MediaFileDownloadedEventHandler
  implements IEventHandler<MediaFileDownloadedEvent>
{
  constructor(
    @Inject(MediaFileRepository.Token)
    private readonly mediaFileRepository: IMediaFileRepository<MediaFile>,
    @Inject(MediaDirectoryRepository.Token)
    private readonly mediaDirectoryRepository: IMediaDirectoryRepository<MediaDirectory>,
  ) {}

  async handle(event: MediaFileDownloadedEvent) {
    const mediaDirectory: MediaDirectory =
      await this.mediaDirectoryRepository.GetById(event.MediaDirectoryId);

    const mediaFile: MediaFile = MediaFile.Create(
      new MediaFileName(event.MediaFileName),
      mediaDirectory,
      new MediaFileFullPath(event.MediaFileFullPath),
      new MediaFileSize(event.MediaFileSize),
    );

    await this.mediaFileRepository.Save(mediaFile);
  }
}
