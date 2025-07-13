import Command from 'src/Common/Application/Abstractions/Messaging/Command';
import { UUIDTypes } from 'uuid';

export default class MediaDirectoryCreateCommand extends Command<UUIDTypes> {
  constructor(
    public readonly MediaDirectoryName: string,
    public readonly MediaDirectoryMediaFilesIds: UUIDTypes[],
    public readonly MediaDirectoryParentId: UUIDTypes | null,
    public readonly MediaDirectoryChildrenIds: UUIDTypes[],
  ) {
    super();
  }
}
