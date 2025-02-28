import MediaFile from '../../../../Media/Domain/MediaFiles/MediaFile';
import { UUIDTypes } from 'uuid';

interface IMediaFileRepository {
  GetMediaFileById(id: UUIDTypes): Promise<MediaFile>;

  Add(mediaFile: MediaFile): Promise<MediaFile>;

  GetMediaFiles(currentPage: number, pageSize: number): Promise<MediaFile[]>;

  Remove(id: UUIDTypes): Promise<boolean>;
}

export default IMediaFileRepository;
