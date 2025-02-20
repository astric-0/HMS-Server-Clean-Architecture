import BaseEntity from 'src/Media/Domain/BaseEntity';
import { EntitySchema } from 'typeorm';

const BaseEntitySchema = new EntitySchema<BaseEntity>({
  target: BaseEntity,
  name: 'Base',
  columns: {
    Id: {
      name: 'id',
      type: 'uuid',
      primary: true,
    },
    Created: {
      name: 'created',
      type: 'timestamp',
    },
  },
});

export default BaseEntitySchema;
