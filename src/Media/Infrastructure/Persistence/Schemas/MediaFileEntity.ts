import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UUIDTypes } from 'uuid';

import IMediaFileRaw from 'src/Common/Application/Abstractions/Repositories/MediaFile/IMediaFileRaw';
import {
  MediaFileName,
  MediaFileFullPath,
  MediaFileSize,
} from 'src/Common/Domain/MediaFiles/ValueTypes';

import MediaDirectoryEntity from './MediaDirectoryEntity';

@Entity('media_file')
export default class MediaFileEntity implements IMediaFileRaw {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  Id: UUIDTypes;

  @Column({ type: 'timestamp', name: 'created' })
  Created: Date;

  @Column({ name: 'name', type: 'varchar' })
  Name: MediaFileName;

  @Column({
    name: 'full_path',
    type: 'varchar',
    transformer: {
      from(value: string) {
        return new MediaFileFullPath(value);
      },
      to(fullPath: MediaFileFullPath) {
        return fullPath.Value;
      },
    },
  })
  FullPath: MediaFileFullPath;

  @ManyToOne(
    () => MediaDirectoryEntity,
    (mediaDirectory) => mediaDirectory.MediaFiles,
    { cascade: true },
  )
  @JoinColumn({ name: 'media_directory_id' })
  MediaDirectory: MediaDirectoryEntity;

  @Column({ name: 'size', type: 'float' })
  Size: MediaFileSize;
}
