import { IBaseEntityRaw } from 'src/Common/Application/Abstractions/Repositories/BaseEntity';
import { PrimaryGeneratedColumn, Column } from 'typeorm';
import { UUIDTypes } from 'uuid';

class BaseEntity implements IBaseEntityRaw {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  Id: UUIDTypes;

  @Column({ type: 'timestamp', name: 'created' })
  Created: Date;
}
export default BaseEntity;
