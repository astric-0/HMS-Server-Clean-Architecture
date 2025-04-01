import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { UUIDTypes } from 'uuid';

import IMediaDirectoryRaw from 'src/Common/Application/Abstractions/Repositories/MediaDirectory/IMediaDirectoryRaw';
import {
  MediaDirectoryName,
  MediaDirectoryFullPath,
} from 'src/Common/Domain/MediaDirectory/ValueTypes';

import MediaFileEntity from './MediaFileEntity';

@Entity('media_directory')
@Tree('closure-table')
export default class MediaDirectoryEntity implements IMediaDirectoryRaw {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  Id: UUIDTypes;

  @Column({ type: 'timestamp', name: 'created' })
  Created: Date;

  @Column({
    name: 'name',
    type: 'varchar',
    transformer: {
      from(value: string): MediaDirectoryName {
        return new MediaDirectoryName(value);
      },
      to(name: MediaDirectoryName): string {
        return name.Value;
      },
    },
  })
  Name: MediaDirectoryName;

  @Column({
    name: 'full_path',
    type: 'varchar',
    transformer: {
      from(value: string): MediaDirectoryFullPath {
        return new MediaDirectoryFullPath(value);
      },
      to(fullPath: MediaDirectoryFullPath): string {
        return fullPath.Value;
      },
    },
  })
  FullPath: MediaDirectoryFullPath;

  @TreeParent()
  @JoinColumn({ name: 'parent_id' })
  Parent: MediaDirectoryEntity;

  @TreeChildren()
  Children: MediaDirectoryEntity[];

  @OneToMany(() => MediaFileEntity, (mediaFile) => mediaFile.MediaDirectory, {
    orphanedRowAction: 'delete',
  })
  MediaFiles: MediaFileEntity[];

  public static FromRaw(raw: IMediaDirectoryRaw): MediaDirectoryEntity {
    const entity: MediaDirectoryEntity = new MediaDirectoryEntity();

    entity.Id = raw.Id;
    entity.Children = raw.Children;
    entity.Created = raw.Created;
    entity.FullPath = raw.FullPath;
    entity.FullPath = raw.FullPath;
    entity.MediaFiles = raw.MediaFiles;
    entity.Parent = raw.Parent;

    return entity;
  }
}
