import { IApplicationEvent } from 'src/Common/Application/Abstractions/ApplicationPublisher/IApplicationEvent';
import { UUIDTypes } from 'uuid';

export default class MediaFileDownloadedEvent implements IApplicationEvent {
  public readonly OccuredOn: Date;

  constructor(
    public readonly MediaFileName: string,
    public readonly MediaDirectoryId: UUIDTypes,
    public readonly MediaFileFullPath: string,
    public readonly MediaFileSize: number,
  ) {
    this.OccuredOn = new Date();
  }
}
