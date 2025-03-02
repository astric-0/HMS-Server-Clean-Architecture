import { In, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUIDTypes } from 'uuid';

import IMediaFileRepository from 'src/Common/Application/Abstractions/Repositories/MediaFile/IMediaFileRepository';
import IMediaFileRaw from 'src/Common/Application/Abstractions/Repositories/MediaFile/IMediaFileRaw';

import MediaFile from 'src/Media/Domain/MediaFiles/MediaFile';

import MediaFileEntity from '../Schemas/MediaFileEntity';

@Injectable()
export default class MediaFileRepository
  implements IMediaFileRepository<MediaFile>
{
  public static readonly Token = Symbol('IMediaFileRepository');

  constructor(
    @InjectRepository(MediaFileEntity)
    private readonly repository: Repository<IMediaFileRaw>,
  ) {}

  async GetMediaFilesByIds(ids: UUIDTypes[]): Promise<MediaFile[]> {
    if (!ids || !ids.length) return [];

    const mediaFiles: IMediaFileRaw[] = await this.repository.find({
      where: { Id: In(ids as string[]) },
    });

    return mediaFiles.map(MediaFile.FromRaw);
  }

  public async GetMediaFileById(id: UUIDTypes): Promise<MediaFile> {
    const raw: IMediaFileRaw = await this.repository.findOneBy({
      Id: id as string,
    });

    return MediaFile.FromRaw(raw);
  }

  public async GetMediaFiles(
    currentPage: number,
    pageSize: number,
  ): Promise<MediaFile[]> {
    const rawFiles: IMediaFileRaw[] = await this.repository.find({
      take: pageSize,
      skip: (currentPage - 1) * pageSize,
    });

    const mediaFiles: MediaFile[] = rawFiles.map(MediaFile.FromRaw);

    return mediaFiles;
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
