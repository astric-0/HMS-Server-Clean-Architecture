import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UUIDTypes } from 'uuid';

import {
  MediaFileName,
  MediaFileFullPath,
  MediaFileSize,
  MediaThumbnailFullPath,
} from 'src/Common/Domain/MediaFiles/ValueTypes';
import IMediaFileRaw from 'src/Common/Application/Abstractions/Repositories/MediaFile/IMediaFileRaw';

import MediaDirectoryEntity from './MediaDirectoryEntity';

@Entity('media_file')
export default class MediaFileEntity implements IMediaFileRaw {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  Id: UUIDTypes;

  @Column({ type: 'timestamp', name: 'created' })
  Created: Date;

  @Column({
    name: 'name',
    type: 'varchar',
    transformer: {
      from(value: string): MediaFileName {
        return new MediaFileName(value);
      },
      to(mediaFileName: MediaFileName): string {
        return mediaFileName.Value;
      },
    },
  })
  Name: MediaFileName;

  @Column({
    name: 'full_path',
    type: 'varchar',
    transformer: {
      from(value: string): MediaFileFullPath {
        return new MediaFileFullPath(value);
      },
      to(fullPath: MediaFileFullPath): string {
        return fullPath.Value;
      },
    },
  })
  FullPath: MediaFileFullPath;

  @ManyToOne(
    () => MediaDirectoryEntity,
    (mediaDirectory) => mediaDirectory.MediaFiles,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'media_directory_id' })
  MediaDirectory: MediaDirectoryEntity;

  @Column({
    name: 'size',
    type: 'float',
    transformer: {
      from(value: number): MediaFileSize {
        return new MediaFileSize(value);
      },
      to(size: MediaFileSize): number {
        return size.Value;
      },
    },
  })
  Size: MediaFileSize;

  @Column({
    name: 'thumbnail_full_path',
    type: 'varchar',
    nullable: true,
    transformer: {
      from(value: string): MediaThumbnailFullPath {
        return new MediaThumbnailFullPath(value);
      },
      to(thumbnailPath: MediaThumbnailFullPath): string {
        return thumbnailPath?.Value;
      },
    },
  })
  ThumbnailFullPath: MediaThumbnailFullPath;

  public static FromRaw(raw: IMediaFileRaw): MediaFileEntity {
    const entity: MediaFileEntity = new MediaFileEntity();

    entity.Id = raw.Id;
    entity.Created = raw.Created;
    entity.FullPath = raw.FullPath;
    entity.MediaDirectory = raw.MediaDirectory;
    entity.ThumbnailFullPath = raw.ThumbnailFullPath;
    entity.Size = raw.Size;
    entity.Name = raw.Name;

    return entity;
  }
}
