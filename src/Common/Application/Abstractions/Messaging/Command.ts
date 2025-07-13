import { Command as CommandNest } from '@nestjs/cqrs';
import Result from 'src/Common/Domain/Result';

export default class Command<TResponse = void> extends CommandNest<
  Result<TResponse>
> {}
