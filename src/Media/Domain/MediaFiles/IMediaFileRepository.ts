import MediaFile from './MediaFile';
import { UUIDTypes } from 'uuid';

interface IMediaFileRepository {
  GetMediaFileById(id: UUIDTypes): Promise<MediaFile>;

  Add(mediaFile: MediaFile): Promise<MediaFile>;

  Remove(id: UUIDTypes): Promise<boolean>;
}

export default IMediaFileRepository;
