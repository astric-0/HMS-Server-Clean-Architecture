import {
  MediaFileFullPath,
  MediaFileName,
  MediaFileSize,
} from 'src/Common/Domain/MediaFiles/ValueTypes';
import { IBaseEntityRaw } from 'src/Common/Application/Abstractions/Repositories/BaseEntity';
import IMediaDirectoryRaw from '../MediaDirectory/IMediaDirectoryRaw';

export default abstract class IMediaFileRaw extends IBaseEntityRaw {
  abstract Name: MediaFileName;
  abstract FullPath: MediaFileFullPath;
  abstract MediaDirectory: IMediaDirectoryRaw;
  abstract Size: MediaFileSize;
}
