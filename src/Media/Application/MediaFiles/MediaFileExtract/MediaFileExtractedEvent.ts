import { UUIDTypes } from 'uuid';

import IApplicationEvent from 'src/Common/Application/Abstractions/ApplicationPublisher/IApplicationEvent';

export default class MediaFileExtractedEvent implements IApplicationEvent {
  public constructor(
    public readonly MediaFileId: UUIDTypes,
    public readonly ExtractedFiles: string[],
    public readonly ArchivedFiles: string[],
    public readonly DestinationPath: string,
  ) {
    this.OccuredOn = new Date();
  }

  OccuredOn: Date;
}
