import { UUIDTypes } from 'uuid';

export default class MediaFileDownloadRequestDto {
  constructor(
    public readonly MediaFileId: UUIDTypes,
    public readonly FullPath?: string,
    public readonly OffSet?: number,
  ) {}
}
