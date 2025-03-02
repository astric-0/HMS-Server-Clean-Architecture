import { UUIDTypes } from 'uuid';
import CachedQuery from 'src/Common/Application/Abstractions/Messaging/CachedQuery';
import MediaFileInfoDto from './MediaFileInfoDto';

export default class MediaFileGetByIdQuery extends CachedQuery<MediaFileInfoDto> {
  constructor(public readonly Id: UUIDTypes) {
    super();
  }

  public get Ttl(): number {
    return 60 * 1000 * 60;
  }

  public get CacheKey(): string {
    return `MediaFile-GetById-[Id=${this.Id}]`;
  }
}
