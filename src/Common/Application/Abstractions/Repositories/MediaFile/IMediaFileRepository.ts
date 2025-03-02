import { UUIDTypes } from 'uuid';
import IMediaFileRaw from './IMediaFileRaw';

interface IMediaFileRepository<T extends IMediaFileRaw> {
  GetMediaFileById(id: UUIDTypes): Promise<T>;

  Add(mediaFile: T): Promise<T>;

  GetMediaFiles(currentPage: number, pageSize: number): Promise<T[]>;

  Remove(id: UUIDTypes): Promise<boolean>;

  GetMediaFilesByIds(ids: UUIDTypes[]): Promise<T[]>;
}

export default IMediaFileRepository;
