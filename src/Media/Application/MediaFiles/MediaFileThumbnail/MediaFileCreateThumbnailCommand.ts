import { UUIDTypes } from 'uuid';

import Command from 'src/Common/Application/Abstractions/Messaging/Command';

export default class MediaFileCreateThumbnailCommand extends Command<void> {
  constructor(
    public readonly MediaFileId: UUIDTypes,
    public readonly OffSet?: number,
    public readonly FullPath?: string,
  ) {
    super();
  }
}
