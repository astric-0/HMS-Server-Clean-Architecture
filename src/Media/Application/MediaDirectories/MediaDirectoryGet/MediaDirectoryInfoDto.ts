import { UUIDTypes } from 'uuid';

import MediaFileInfoDto from '../../MediaFiles/MediaFileGet/MediaFileInfoDto';

export class MediaDirectoryInfoDto {
  constructor(
    public readonly Id: UUIDTypes,
    public readonly Created: Date,
    public readonly DirectoryName: string,
    public readonly Parent: MediaDirectoryInfoDto,
    public readonly Children: MediaDirectoryInfoDto[],
    public readonly MediaFiles: MediaFileInfoDto[],
  ) {}
}
