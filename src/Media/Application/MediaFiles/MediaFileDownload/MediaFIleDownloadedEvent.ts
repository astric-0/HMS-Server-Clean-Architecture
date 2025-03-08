import { UUIDTypes } from 'uuid';
import { IApplicationEvent } from 'src/Common/Application/Abstractions/ApplicationPublisher/IApplicationEvent';

export default class MediaFileDownloadedEvent implements IApplicationEvent {
  public readonly OccuredOn: Date;

  constructor(
    public readonly MediaFileName: string,
    public readonly MediaDirectoryId: UUIDTypes,
    public readonly MediaFileFullPath: string,
    public readonly MediaThumbnailFullPath: string,
    public readonly MediaFileSize: number,
  ) {
    this.OccuredOn = new Date();
  }
}
