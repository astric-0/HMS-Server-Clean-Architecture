import {
  MediaFileFullPath,
  MediaFileMasterDirectory,
  MediaFileName,
  MediaFileSize,
} from '../../../../Media/Domain/MediaFiles/ValueTypes';
import { IBaseEntityRaw } from '../../../../Media/Domain/BaseEntity';

export default interface IMediaFileRaw extends IBaseEntityRaw {
  Name: MediaFileName;
  FullPath: MediaFileFullPath;
  MasterDirectory: MediaFileMasterDirectory;
  Size: MediaFileSize;
}
