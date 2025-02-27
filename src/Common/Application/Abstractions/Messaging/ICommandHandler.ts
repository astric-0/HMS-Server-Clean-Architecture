import { ICommandHandler as ICommandHandlerNest } from '@nestjs/cqrs';
import Result from 'src/Common/Domain/Result';
import Command from './Command';

declare type ICommandHandler<
  TCommand extends Command<TResponse>,
  TResponse,
> = ICommandHandlerNest<TCommand, Result<TResponse>>;

export default ICommandHandler;
