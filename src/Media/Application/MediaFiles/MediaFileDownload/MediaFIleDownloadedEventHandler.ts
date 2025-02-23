//import { IApplicationEvent } from 'src/Media/Application/Abstractions/ApplicationPublisher/IApplicationEvent';
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import MediaFileDownloadedEvent from './MediaFIleDownloadedEvent';
import IMediaFileRepository from '../../../../Common/Application/Abstractions/Repositories/IMediaFileRepository';
import MediaFileRepository from 'src/Media/Infrastructure/Persistence/Repositories/MediaFileRepository';
import MediaFile from 'src/Media/Domain/MediaFiles/MediaFile';
import {
  MediaFileFullPath,
  MediaFileMasterDirectory,
  MediaFileName,
} from 'src/Media/Domain/MediaFiles/ValueTypes';

@EventsHandler(MediaFileDownloadedEvent)
export default class MediaFileDownloadedEventHandler
  implements IEventHandler<MediaFileDownloadedEvent>
{
  constructor(
    @Inject(MediaFileRepository.Token)
    private readonly mediaFileRepository: IMediaFileRepository,
  ) {}

  async handle(event: MediaFileDownloadedEvent) {
    const mediaFile: MediaFile = MediaFile.Create(
      new MediaFileName(event.MediaFileName),
      new MediaFileMasterDirectory(event.MediaFileMasterDirectory),
      new MediaFileFullPath(event.MediaFileFullPath),
    );

    await this.mediaFileRepository.Add(mediaFile);
  }
}
