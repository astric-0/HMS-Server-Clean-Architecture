import MediaFile from '../MediaFile';

export default class MediaFileMasterDirectory {
  constructor(
    public readonly Value: (typeof MediaFile.MasterDirectories)[number],
  ) {}
}
