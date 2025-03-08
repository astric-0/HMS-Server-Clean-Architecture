import { UUIDTypes } from 'uuid';

export default class FileDownloadJobData {
  constructor(
    public MediaFileName: string,
    public readonly ThumbnailFileName: string,
    public readonly MediaDirectoryId: UUIDTypes,
    public readonly URL: string,
    public readonly MediaFilePath: string,
    public readonly MediaThumbnailFilePath: string,
  ) {}
}
