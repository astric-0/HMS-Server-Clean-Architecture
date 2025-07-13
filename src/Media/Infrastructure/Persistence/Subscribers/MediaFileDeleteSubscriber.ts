import {
  EntitySubscriberInterface,
  RemoveEvent,
  EventSubscriber,
} from 'typeorm';

import FileService from 'src/Common/Infrastructure/Services/Files/FileService';

import MediaFileEntity from '../Schemas/MediaFileEntity';

@EventSubscriber()
export default class MediaFileRemovedSubscriber
  implements EntitySubscriberInterface<MediaFileEntity>
{
  listenTo() {
    return MediaFileEntity;
  }

  async afterRemove(event: RemoveEvent<MediaFileEntity>): Promise<void> {
    await FileService.RemoveDirectory(
      FileService.DirPath(event.entity.FullPath.Value),
    );
  }
}
