import { UUIDTypes } from 'uuid';

export default class RarExtractionJobData {
  public constructor(
    public readonly MediaFileId: UUIDTypes,
    public readonly SourceFileFullPath: string,
    public readonly DestinationFullPath: string,
  ) {}
}
