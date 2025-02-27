import Query from './Query';

export default abstract class CachedQuery<TResponse> extends Query<TResponse> {
  abstract Ttl: number;
  abstract CacheKey: string;

  constructor() {
    super();
  }
}
