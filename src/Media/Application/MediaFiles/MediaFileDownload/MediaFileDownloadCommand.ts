import { UUIDTypes } from 'uuid';
import Command from '../../Shared/Messaging/Command';

export default class DownloadMediaFileCommand extends Command<UUIDTypes> {
  constructor(
    public readonly MediaFileName: string,
    public readonly MasterDirectory: string,
    public readonly URL: string,
  ) {
    super();
  }
}
