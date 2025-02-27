import {
  MediaFileFullPath,
  MediaFileMasterDirectory,
  MediaFileName,
  MediaFileSize,
} from '../../../Domain/MediaFiles/ValueTypes';
import { IBaseEntityRaw } from '../../../../Media/Domain/BaseEntity';

export default abstract class IMediaFileRaw extends IBaseEntityRaw {
  abstract Name: MediaFileName;
  abstract FullPath: MediaFileFullPath;
  abstract MasterDirectory: MediaFileMasterDirectory;
  abstract Size: MediaFileSize;
}
