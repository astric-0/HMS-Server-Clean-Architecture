/*
import { EntitySchema } from 'typeorm';

import {
  MediaFileFullPath,
  MediaFileName,
  MediaFileSize,
} from 'src/Common/Domain/MediaFiles/ValueTypes';
import IMediaFileRaw from 'src/Common/Application/Abstractions/Repositories/MediaFile/IMediaFileRaw';

import BaseEntitySchema from './BaseEntitySchema';
import IMediaDirectoryRaw from 'src/Common/Application/Abstractions/Repositories/MediaDirectory/IMediaDirectoryRaw';

const MediaFileSchema = new EntitySchema<IMediaFileRaw>({
  name: 'IMediaFileRaw',
  target: IMediaFileRaw,
  tableName: 'media_file',
  columns: {
    ...BaseEntitySchema.options.columns,
    Name: {
      name: 'name',
      type: 'varchar',
      transformer: {
        from: (value: string): MediaFileName => new MediaFileName(value),
        to: (mediaFileName: MediaFileName): string => mediaFileName.Value,
      },
    },
    FullPath: {
      name: 'full_path',
      type: 'varchar',
      transformer: {
        from: (value: string): MediaFileFullPath =>
          new MediaFileFullPath(value),
        to: (mediaFileFullPath: MediaFileFullPath): string =>
          mediaFileFullPath.Value,
      },
    },
    Size: {
      name: 'size',
      type: 'int',
      transformer: {
        from: (value: number): MediaFileSize => new MediaFileSize(value),
        to: (mediaFileSize: MediaFileSize): number => mediaFileSize.Value,
      },
    },
  },
  relations: {
    MediaDirectory: {
      type: 'many-to-one',
      joinColumn: { name: 'media_directory_id' },
      cascade: true,
      target: IMediaDirectoryRaw,
      inverseSide: 'MediaFiles',
    },
  },
});

export default MediaFileSchema;
*/
