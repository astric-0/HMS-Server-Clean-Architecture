import { EntitySchema } from 'typeorm';

import MediaFile from 'src/Media/Domain/MediaFiles/MediaFile';
import {
  MediaFileFullPath,
  MediaFileMasterDirectory,
  MediaFileName,
  MediaFileSize,
} from 'src/Media/Domain/MediaFiles/ValueTypes';

import BaseEntitySchema from './BaseEntitySchema';

const MediaFileSchema = new EntitySchema<MediaFile>({
  name: 'MediaFile',
  target: MediaFile,
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
    MasterDirectory: {
      name: 'master_directory',
      type: 'varchar',
      transformer: {
        from: (value: string): MediaFileMasterDirectory =>
          new MediaFileMasterDirectory(value),
        to: (mediaFileMasterDirectory: MediaFileMasterDirectory): string =>
          mediaFileMasterDirectory.Value,
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
});

export default MediaFileSchema;
