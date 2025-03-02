/*
import { EntitySchema } from 'typeorm';

import { MediaDirectoryName } from 'src/Common/Domain/MediaDirectory/ValueTypes';
import IMediaDirectoryRaw from 'src/Common/Application/Abstractions/Repositories/MediaDirectory/IMediaDirectoryRaw';
import IMediaFileRaw from 'src/Common/Application/Abstractions/Repositories/MediaFile/IMediaFileRaw';

import BaseEntitySchema from './BaseEntitySchema';

const MediaDirectorySchema = new EntitySchema<IMediaDirectoryRaw>({
  name: 'IMediaDirectoryRaw',
  target: IMediaDirectoryRaw,
  tableName: 'media_directory',
  columns: {
    ...BaseEntitySchema.options.columns,
    Name: {
      name: 'name',
      type: 'varchar',
      transformer: {
        from(value: string): MediaDirectoryName {
          return new MediaDirectoryName(value);
        },
        to(mediaDirectoryName: MediaDirectoryName): string {
          return mediaDirectoryName.Value;
        },
      },
    },
  },
  relations: {
    Parent: {
      type: 'many-to-one',
      target: IMediaDirectoryRaw,
      joinColumn: { name: 'parent_id' },
      nullable: true,
      inverseSide: 'Children',
    },
    Children: {
      type: 'one-to-many',
      target: IMediaDirectoryRaw,
      inverseSide: 'Parent',
      orphanedRowAction: 'delete',
      cascade: true,
    },
    MediaFiles: {
      type: 'one-to-many',
      target: IMediaFileRaw,
      inverseSide: 'MediaDirectory',
    },
  },
});

export default MediaDirectorySchema;
*/
