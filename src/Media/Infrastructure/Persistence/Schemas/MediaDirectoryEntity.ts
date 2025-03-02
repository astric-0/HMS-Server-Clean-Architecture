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
import { MediaDirectoryName } from 'src/Common/Domain/MediaDirectory/ValueTypes';

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
      from(value: string) {
        return new MediaDirectoryName(value);
      },
      to(name: MediaDirectoryName) {
        return name.Value;
      },
    },
  })
  Name: MediaDirectoryName;

  @TreeParent()
  @JoinColumn({ name: 'parent_id' })
  Parent: MediaDirectoryEntity;

  @TreeChildren()
  Children: MediaDirectoryEntity[];

  @OneToMany(() => MediaFileEntity, (mediaFile) => mediaFile.MediaDirectory, {
    orphanedRowAction: 'delete',
  })
  MediaFiles: MediaFileEntity[];
}
