import MediaFile from '../../../../Media/Domain/MediaFiles/MediaFile';

export default class MediaFileMasterDirectory {
  constructor(
    public readonly Value: (typeof MediaFile.MasterDirectories)[number],
  ) {}
}
