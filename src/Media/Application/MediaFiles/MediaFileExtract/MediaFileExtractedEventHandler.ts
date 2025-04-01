import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import IMediaFileRepository from 'src/Common/Application/Abstractions/Repositories/MediaFile/IMediaFileRepository';
import {
  MediaFileFullPath,
  MediaFileName,
  MediaFileSize,
} from 'src/Common/Domain/MediaFiles/ValueTypes';
import FileService, {
  ExistsInfo,
} from 'src/Common/Infrastructure/Services/Files/FileService';

import MediaFileRepository from 'src/Media/Infrastructure/Persistence/Repositories/MediaFileRepository';
import MediaFile from 'src/Media/Domain/MediaFiles/MediaFile';

import MediaFileExtractedEvent from './MediaFileExtractedEvent';

@EventsHandler(MediaFileExtractedEvent)
export default class MediaFileExtractedEventHandler
  implements IEventHandler<MediaFileExtractedEvent>
{
  constructor(
    @Inject(MediaFileRepository.Token)
    private readonly mediaFileRepository: IMediaFileRepository<MediaFile>,
  ) {}

  async handle(event: MediaFileExtractedEvent) {
    const mediaFile = await this.mediaFileRepository.GetMediaFileById(
      event.MediaFileId,
    );

    // log errors;
    if (!mediaFile) return;

    if (event.ArchivedFiles.length != event.ExtractedFiles.length) {
      // log error for missing files
    }

    const [allExists, report] = FileService.Exists(
      event.ExtractedFiles,
      event.DestinationPath,
    );

    if (!allExists) {
      // log error for missing files
    }

    const mediaFilePromises = report
      .filter((existsInfo) => existsInfo.exists)
      .map(async (existsInfo: ExistsInfo): Promise<MediaFile> => {
        const { size } = await FileService.GetStats(existsInfo.fileFullPath);

        return MediaFile.Create(
          new MediaFileName(existsInfo.filename),
          mediaFile.MediaDirectory,
          new MediaFileFullPath(existsInfo.fileFullPath),
          new MediaFileSize(size),
        );
      });

    const mediaFiles: MediaFile[] = await Promise.all(mediaFilePromises);

    await this.mediaFileRepository.SaveMany(mediaFiles);
  }
}
