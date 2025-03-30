import { UUIDTypes } from 'uuid';
import IMediaFileRaw from './IMediaFileRaw';
import { MediaFileFullPath } from 'src/Common/Domain/MediaFiles/ValueTypes';

interface IMediaFileRepository<TDomainEntity extends IMediaFileRaw> {
  GetMediaFileById(id: UUIDTypes): Promise<TDomainEntity>;

  Save(mediaFile: TDomainEntity): Promise<TDomainEntity>;

  SaveMany(mediaFile: TDomainEntity[]): Promise<TDomainEntity[]>;

  Update(id: UUIDTypes, fields: Partial<TDomainEntity>): Promise<boolean>;

  GetMediaFiles(
    currentPage: number,
    pageSize: number,
  ): Promise<TDomainEntity[]>;

  Remove(id: UUIDTypes): Promise<boolean>;

  GetMediaFilesByIds(ids: UUIDTypes[]): Promise<TDomainEntity[]>;

  GetFullPathById(id: UUIDTypes): Promise<MediaFileFullPath>;

  CheckExistsById(id: UUIDTypes): Promise<boolean>;
}

export default IMediaFileRepository;
