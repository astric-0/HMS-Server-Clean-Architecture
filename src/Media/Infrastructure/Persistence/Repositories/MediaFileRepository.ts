import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUIDTypes } from 'uuid';

import IMediaFileRepository from 'src/Common/Application/Abstractions/Repositories/IMediaFileRepository';
import IMediaFileRaw from 'src/Common/Application/Abstractions/Repositories/IMediaFileRaw';
import MediaFile from 'src/Media/Domain/MediaFiles/MediaFile';
import MediaFileSchema from '../Schemas/MediaFileSchema';

@Injectable()
export default class MediaFileRepository implements IMediaFileRepository {
  public static readonly Token = Symbol('IMediaFileRepository');

  constructor(
    @InjectRepository(MediaFileSchema)
    private readonly repository: Repository<IMediaFileRaw>,
  ) {}

  public async GetMediaFileById(id: UUIDTypes): Promise<MediaFile> {
    const raw: IMediaFileRaw = await this.repository.findOneBy({
      Id: id as string,
    });

    return MediaFile.FromRaw(raw);
  }

  public async Add(mediaFile: MediaFile): Promise<MediaFile> {
    const raw: IMediaFileRaw = await this.repository.save(mediaFile);

    return MediaFile.FromRaw(raw);
  }

  public async Remove(id: UUIDTypes): Promise<boolean> {
    const deleteResult = await this.repository.delete({ Id: id as string });

    return deleteResult.affected > 0;
  }
}
