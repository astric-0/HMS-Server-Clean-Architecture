import { UUIDTypes } from 'uuid';
import ICommandHandler from '../../Shared/Messaging/ICommandHandler';
import DownloadMediaFileCommand from './DownloadMediaFileCommand';
import { CommandHandler } from '@nestjs/cqrs';
import Result from 'src/Media/Domain/Shared/Result';
import Error from 'src/Media/Domain/Shared/Error';

@CommandHandler(DownloadMediaFileCommand)
export default class DownloadMediaFileCommandHandler
  implements ICommandHandler<DownloadMediaFileCommand, UUIDTypes>
{
  async execute(command: DownloadMediaFileCommand): Promise<Result<UUIDTypes>> {
    //throw new Error('Method not implemented.');
    console.log(command.MasterDirectory);

    const value = Result.Failure<UUIDTypes>(Error.InValidValue);
    return await value;
  }
}
