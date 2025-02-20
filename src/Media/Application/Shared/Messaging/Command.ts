import { Command as CommandNest } from '@nestjs/cqrs';
import Result from 'src/Media/Domain/Shared/Result';

export default class Command<TResponse = void> extends CommandNest<
  Result<TResponse>
> {}
