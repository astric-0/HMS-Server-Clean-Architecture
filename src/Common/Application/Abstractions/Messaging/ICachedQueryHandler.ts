import ICachedQuery from './CachedQuery';
import Result from 'src/Common/Domain/Result';

interface ICachedQueryHandler<
  TCachedQuery extends ICachedQuery<TResponse>,
  TResponse,
> {
  executeCached(query: TCachedQuery): Promise<Result<TResponse>>;
}

export default ICachedQueryHandler;
