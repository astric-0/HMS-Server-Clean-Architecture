import { Query as QueryNest } from '@nestjs/cqrs';
import Result from 'src/Common/Domain/Result';

export default class Query<TResponse = void> extends QueryNest<
  Result<TResponse>
> {}
