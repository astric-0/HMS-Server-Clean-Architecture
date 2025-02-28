import ICachedQuery from 'src/Common/Application/Abstractions/Messaging/CachedQuery';
import MediaFileInfoDto from './MediaFileInfoDto';

export default class MediaFileGetAllQuery extends ICachedQuery<
  MediaFileInfoDto[]
> {
  constructor(
    public readonly CurrentPage: number,
    public readonly PageSize: number,
  ) {
    super();
  }

  public get Ttl(): number {
    return 60 * 1000 * 60;
  }

  public get CacheKey(): string {
    return `MediaFile-GetAll-[CurrentPage=${this.CurrentPage}]-[PageSize=${this.PageSize}]`;
  }
}
