import { IApplicationEvent } from 'src/Common/Application/Abstractions/ApplicationPublisher/IApplicationEvent';

export default class MediaFileDownloadedEvent implements IApplicationEvent {
  public readonly OccuredOn: Date;

  constructor(
    public readonly MediaFileName: string,
    public readonly MediaFileMasterDirectory: string,
    public readonly MediaFileFullPath: string,
  ) {
    this.OccuredOn = new Date();
  }
}
