import { UUIDTypes } from 'uuid';
import { MediaDirectoryInfoDto } from './MediaDirectoryInfoDto';
import CachedQuery from 'src/Common/Application/Abstractions/Messaging/CachedQuery';

export class MediaDirectoryGetByIdQuery extends CachedQuery<MediaDirectoryInfoDto> {
  public get Ttl(): number {
    return 60 * 1000 * 60;
  }

  public get CacheKey(): string {
    return `MediaDirectory-GetById-[Id=${this.Id}]`;
  }

  constructor(public readonly Id: UUIDTypes) {
    super();
  }
}
