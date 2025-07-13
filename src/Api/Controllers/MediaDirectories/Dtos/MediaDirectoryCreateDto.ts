import { UUIDTypes } from 'uuid';

export default class MediaDirectoryCreateDto {
  constructor(
    public readonly DirectoryName: string,
    public readonly ParentDirectoryId?: UUIDTypes,
    public readonly ChildDirectoriesIds?: UUIDTypes[],
    public readonly MediaFilesIds?: UUIDTypes[],
  ) {}
}
