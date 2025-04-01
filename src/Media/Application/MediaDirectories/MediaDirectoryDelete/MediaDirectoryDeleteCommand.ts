import { UUIDTypes } from 'uuid';

import Command from 'src/Common/Application/Abstractions/Messaging/Command';

export default class MediaDirectoryDeleteCommand extends Command<void> {
  constructor(public readonly MediaDirectoryId: UUIDTypes) {
    super();
  }
}
