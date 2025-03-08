import { UUIDTypes } from 'uuid';

export default class FileDownloadJobData {
  constructor(
    public readonly MediaFileName: string,
    public readonly MediaDirectoryId: UUIDTypes,
    public readonly URL: string,
    public readonly MediaFileFullPath: string,
    public readonly MediaThumbnailFileFullPath: string,
  ) {}
}
