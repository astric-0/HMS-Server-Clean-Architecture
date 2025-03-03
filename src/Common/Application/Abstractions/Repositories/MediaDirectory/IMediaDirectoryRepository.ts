import { UUIDTypes } from 'uuid';
import IMediaDirectoryRaw from './IMediaDirectoryRaw';
import { MediaDirectoryName } from 'src/Common/Domain/MediaDirectory/ValueTypes';

interface IMediaDirectoryRepository<TDomainEntity extends IMediaDirectoryRaw> {
  GetById(id: UUIDTypes): Promise<TDomainEntity>;

  GetByIds(ids: UUIDTypes[]): Promise<TDomainEntity[]>;

  GetMasterDirectories(): Promise<TDomainEntity[]>;

  GetMasterDirectoryByName(name: MediaDirectoryName): Promise<TDomainEntity>;

  Save(mediaDirectory: TDomainEntity): Promise<TDomainEntity>;

  Remove(id: UUIDTypes): Promise<boolean>;

  CheckMasterDirectoryExistsByName(name: MediaDirectoryName): Promise<boolean>;

  CheckExistsById(id: UUIDTypes): Promise<boolean>;

  CheckIfExistsByNameAndParent(
    name: MediaDirectoryName,
    parent: UUIDTypes,
  ): Promise<boolean>;
}

export default IMediaDirectoryRepository;
