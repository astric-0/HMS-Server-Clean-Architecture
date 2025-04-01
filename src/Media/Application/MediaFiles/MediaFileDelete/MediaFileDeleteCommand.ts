import { UUIDTypes } from 'uuid';

import Command from 'src/Common/Application/Abstractions/Messaging/Command';

export default class MediaFileDeleteCommand extends Command<void> {
  constructor(public readonly MediaFileId: UUIDTypes) {
    super();
  }
}
