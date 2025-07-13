import { UUIDTypes } from 'uuid';

export default class MediaFileInfoDto {
  constructor(
    public readonly Id: UUIDTypes,
    public readonly FileName: string,
    public readonly MediaDirectoryId: UUIDTypes,
    public readonly MediaDirectoryName: string,
    public readonly Size: number,
    public readonly Created: Date,
  ) {}
}
