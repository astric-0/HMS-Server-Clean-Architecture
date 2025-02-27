import { IBaseEntityRaw } from 'src/Media/Domain/BaseEntity';
import { EntitySchema } from 'typeorm';

const BaseEntitySchema = new EntitySchema<IBaseEntityRaw>({
  name: 'IBaseEntityRaw',
  target: IBaseEntityRaw,
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
