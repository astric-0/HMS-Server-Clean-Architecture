import { UUIDTypes } from 'uuid';

export default abstract class BaseEntity implements IBaseEntityRaw {
  private _id: UUIDTypes;
  private _created: Date;

  protected constructor(id: UUIDTypes) {
    this.Id = id;
    this.Created = new Date();
  }

  public get Id(): string {
    return this._id.toString();
  }

  protected set Id(value: UUIDTypes) {
    this._id = value;
  }

  public get Created(): Date {
    return this._created;
  }

  protected set Created(value: Date) {
    this._created = value;
  }
}

export abstract class IBaseEntityRaw {
  abstract Id: UUIDTypes;
  abstract Created: Date;
}
