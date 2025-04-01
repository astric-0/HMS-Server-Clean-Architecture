import { In, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUIDTypes } from 'uuid';

import IMediaFileRepository from 'src/Common/Application/Abstractions/Repositories/MediaFile/IMediaFileRepository';
import IMediaFileRaw from 'src/Common/Application/Abstractions/Repositories/MediaFile/IMediaFileRaw';
import { MediaFileFullPath } from 'src/Common/Domain/MediaFiles/ValueTypes';

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

  async CheckExistsById(id: UUIDTypes): Promise<boolean> {
    const result = await this.repository.query(
      'SELECT 1 FROM media_file WHERE id = $1 LIMIT 1',
      [id as string],
    );

    return !!result.length;
  }

  async GetFullPathById(id: UUIDTypes): Promise<MediaFileFullPath> {
    const result = await this.repository.query(
      'SELECT full_path FROM media_file WHERE id = $1 LIMIT 1',
      [id as string],
    );

    const fullPath: string = result?.[0]?.full_path;
    if (!fullPath) return null;

    return new MediaFileFullPath(fullPath);
  }

  async GetMediaFilesByIds(ids: UUIDTypes[]): Promise<MediaFile[]> {
    if (!ids || !ids.length) return [];

    const mediaFiles: IMediaFileRaw[] = await this.repository.find({
      where: { Id: In(ids as string[]) },
    });

    return mediaFiles.map(MediaFile.FromRaw);
  }

  public async GetMediaFileById(id: UUIDTypes): Promise<MediaFile> {
    const raw: IMediaFileRaw = await this.repository.findOne({
      where: { Id: id as string },
      relations: ['MediaDirectory'],
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

  public async Save(mediaFile: MediaFile): Promise<MediaFile> {
    const raw: IMediaFileRaw = await this.repository.save(mediaFile);

    return MediaFile.FromRaw(raw);
  }

  public async SaveMany(mediaFiles: MediaFile[]): Promise<MediaFile[]> {
    const rawFiles: IMediaFileRaw[] = await this.repository.save(mediaFiles);

    return rawFiles.map(MediaFile.FromRaw);
  }

  async Update(id: UUIDTypes, fields: Partial<MediaFile>): Promise<boolean> {
    const result = await this.repository.update({ Id: id as string }, fields);

    return !!result.affected;
  }

  public async RemoveById(id: UUIDTypes): Promise<boolean> {
    const mediaFileRaw: IMediaFileRaw = await this.GetMediaFileById(id);

    if (!mediaFileRaw) return false;

    return await this.Remove(mediaFileRaw as MediaFile);
  }

  public async Remove(mediaFile: MediaFile): Promise<boolean> {
    await this.repository.remove(MediaFileEntity.FromRaw(mediaFile));

    return true;
  }
}
