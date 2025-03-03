import { UUIDTypes } from 'uuid';
import Command from 'src/Common/Application/Abstractions/Messaging/Command';

export default class MediaFileDownloadCommand extends Command<UUIDTypes> {
  constructor(
    public readonly MediaFileName: string,
    public readonly MediaDirectoryId: UUIDTypes,
    public readonly URL: string,
  ) {
    super();
  }
}
