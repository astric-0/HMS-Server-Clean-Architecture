import { UUIDTypes } from 'uuid';
import IMediaDirectoryRaw from './IMediaDirectoryRaw';
import { MediaDirectoryName } from 'src/Common/Domain/MediaDirectory/ValueTypes';

interface IMediaDirectoryRepository<T extends IMediaDirectoryRaw> {
  GetById(id: UUIDTypes): Promise<T>;

  GetByIds(ids: UUIDTypes[]): Promise<T[]>;

  GetMasterDirectories(): Promise<T[]>;

  GetMasterDirectoryByName(name: MediaDirectoryName): Promise<T>;

  Save(mediaDirectory: T): Promise<T>;

  Remove(id: UUIDTypes): Promise<boolean>;

  CheckMasterDirectoryExistsByName(name: MediaDirectoryName): Promise<boolean>;

  CheckIfExistsByNameAndParent(
    name: MediaDirectoryName,
    parent: UUIDTypes,
  ): Promise<boolean>;
}

export default IMediaDirectoryRepository;
