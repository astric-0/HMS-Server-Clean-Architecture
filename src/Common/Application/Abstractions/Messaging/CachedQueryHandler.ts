import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from '@nestjs/cache-manager';
import ICachedQueryHandler from './ICachedQueryHandler';
import CachedQuery from './CachedQuery';
import Result from 'src/Common/Domain/Result';
import IQueryHandler from './IQueryHandler';

export default abstract class CachedQueryHandler<
    TCachedQuery extends CachedQuery<TResponse>,
    TResponse,
  >
  implements
    ICachedQueryHandler<TCachedQuery, TResponse>,
    IQueryHandler<TCachedQuery, TResponse>
{
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  abstract executeCached(query: TCachedQuery): Promise<Result<TResponse>>;

  async execute(query: TCachedQuery): Promise<Result<TResponse>> {
    const cached: Result<TResponse> = await this.cacheManager.get(
      query.CacheKey,
    );

    if (cached) return cached;

    const result = await this.executeCached(query);

    if (result.IsSuccess)
      await this.cacheManager.set(query.CacheKey, result, query.Ttl);

    return result;
  }
}
