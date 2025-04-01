import { UUIDTypes } from 'uuid';

export default class MediaDirectoryMediaFileDeletionReportDto {
  constructor(
    public readonly MediaFileId: UUIDTypes,
    public readonly MediaFileName: string,
    public readonly IsDeleted: boolean,
  ) {}
}
