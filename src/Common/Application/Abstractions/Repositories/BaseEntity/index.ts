import { UUIDTypes } from 'uuid';

export default abstract class BaseEntity implements IBaseEntityRaw {
  #id: UUIDTypes;
  #created: Date;

  protected constructor(id: UUIDTypes) {
    this.Id = id;
    this.Created = new Date();
  }

  public get Id(): UUIDTypes {
    return this.#id.toString();
  }

  protected set Id(value: UUIDTypes) {
    this.#id = value;
  }

  public get Created(): Date {
    return this.#created;
  }

  protected set Created(value: Date) {
    this.#created = value;
  }
}

export abstract class IBaseEntityRaw {
  abstract Id: UUIDTypes;
  abstract Created: Date;
}
