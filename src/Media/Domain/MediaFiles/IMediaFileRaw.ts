import {
  MediaFileFullPath,
  MediaFileMasterDirectory,
  MediaFileName,
} from './ValueTypes';
import { IBaseEntityRaw } from '../BaseEntity';

export default interface IMediaFileRaw extends IBaseEntityRaw {
  Name: MediaFileName;
  FullPath: MediaFileFullPath;
  MasterDirectory: MediaFileMasterDirectory;
}
