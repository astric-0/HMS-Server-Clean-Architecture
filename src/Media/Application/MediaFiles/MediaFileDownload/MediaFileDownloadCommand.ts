import { UUIDTypes } from 'uuid';
import Command from '../../../../Common/Application/Abstractions/Messaging/Command';

export default class DownloadMediaFileCommand extends Command<UUIDTypes> {
  constructor(
    public readonly MediaFileName: string,
    public readonly MasterDirectory: string,
    public readonly URL: string,
  ) {
    super();
  }
}
