import { UUIDTypes } from 'uuid';
import ICachedQuery from 'src/Common/Application/Abstractions/Messaging/CachedQuery';
import MediaFileInfoDto from './MediaFileInfoDto';

export default class MediaFileGetByIdQuery extends ICachedQuery<MediaFileInfoDto> {
  constructor(public readonly Id: UUIDTypes) {
    super();
  }

  public get Ttl(): number {
    return 60 * 1000 * 60;
  }

  public get CacheKey(): string {
    return this.Id.toString();
  }
}
