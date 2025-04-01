import { UUIDTypes } from 'uuid';

import Command from 'src/Common/Application/Abstractions/Messaging/Command';

export default class MediaFileExtractCommand extends Command<UUIDTypes> {
  constructor(public readonly MediaFileId: UUIDTypes) {
    super();
  }
}
