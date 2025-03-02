/*
import { EntitySchema } from 'typeorm';

import IMediaDirectoryRaw from 'src/Common/Application/Abstractions/Repositories/MediaDirectory/IMediaDirectoryRaw';
import IMediaDirectoryClosureRaw from 'src/Common/Application/Abstractions/Repositories/MediaDirectory/IMediaDirectoryClosureRaw';

const MediaDirectoryClosureSchema = new EntitySchema<IMediaDirectoryClosureRaw>(
  {
    name: 'IMediaDirectoryClosureRaw',
    target: IMediaDirectoryClosureRaw,
    tableName: 'media_directory_closure',
    columns: {
      Depth: {
        type: 'int',
        name: 'depth',
      },
    },
    relations: {
      Ancestor: {
        type: 'many-to-one',
        target: () => IMediaDirectoryRaw,
        joinColumn: { name: 'ancestor_id' },
        nullable: false,
        primary: true,
      },
      Descendant: {
        type: 'many-to-one',
        target: () => IMediaDirectoryRaw,
        joinColumn: { name: 'descendant_id' },
        nullable: false,
        primary: true,
      },
    },
  },
);

export default MediaDirectoryClosureSchema;
*/
