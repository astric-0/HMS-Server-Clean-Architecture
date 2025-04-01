import { UUIDTypes } from 'uuid';

import CachedQuery from 'src/Common/Application/Abstractions/Messaging/CachedQuery';

export default class MediaFileGetFullPathQuery extends CachedQuery<string> {
  constructor(public readonly Id: UUIDTypes) {
    super();
  }

  public get Ttl(): number {
    return 60 * 1000 * 60;
  }

  public get CacheKey(): string {
    return `MediaFile-FullPath-GetById-[Id=${this.Id}]`;
  }
}
