import Result from 'src/Common/Domain/Result';
import Query from './Query';

// declare type IQueryHandler<
//   TQuery extends Query<TResponse>,
//   TResponse,
// > = IQueryHandlerNest<TQuery, Result<TResponse>>;

// export default IQueryHandler;

export default interface IQueryHandler<
  TQuery extends Query<TResponse>,
  TResponse,
> {
  //extends IQueryHandlerNest<TQuery, Result<TResponse>>
  execute(query: TQuery): Promise<Result<TResponse>>;
}
