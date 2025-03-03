import { UUIDTypes } from 'uuid';
import IMediaFileRaw from './IMediaFileRaw';

interface IMediaFileRepository<TDomainEntity extends IMediaFileRaw> {
  GetMediaFileById(id: UUIDTypes): Promise<TDomainEntity>;

  Add(mediaFile: TDomainEntity): Promise<TDomainEntity>;

  GetMediaFiles(
    currentPage: number,
    pageSize: number,
  ): Promise<TDomainEntity[]>;

  Remove(id: UUIDTypes): Promise<boolean>;

  GetMediaFilesByIds(ids: UUIDTypes[]): Promise<TDomainEntity[]>;
}

export default IMediaFileRepository;
