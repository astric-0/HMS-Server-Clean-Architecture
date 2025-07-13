import { MediaDirectoryName } from 'src/Common/Domain/MediaDirectory/ValueTypes';
import { IBaseEntityRaw } from '../BaseEntity';
import IMediaFileRaw from '../MediaFile/IMediaFileRaw';
import MediaDirectoryFullPath from 'src/Common/Domain/MediaDirectory/ValueTypes/MediaDirectoryFullPath';

export default interface IMediaDirectoryRaw extends IBaseEntityRaw {
  Name: MediaDirectoryName;
  Parent: IMediaDirectoryRaw;
  Children: IMediaDirectoryRaw[];
  MediaFiles: IMediaFileRaw[];
  FullPath: MediaDirectoryFullPath;
}
