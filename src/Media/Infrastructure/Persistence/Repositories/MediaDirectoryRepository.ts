import { Repository, In } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUIDTypes } from 'uuid';

import IMediaDirectoryRaw from 'src/Common/Application/Abstractions/Repositories/MediaDirectory/IMediaDirectoryRaw';
import IMediaDirectoryRepository from 'src/Common/Application/Abstractions/Repositories/MediaDirectory/IMediaDirectoryRepository';
import { MediaDirectoryName } from 'src/Common/Domain/MediaDirectory/ValueTypes';

import MediaDirectory from 'src/Media/Domain/MediaDirectories/MediaDirectory';

import MediaDirectoryEntity from '../Schemas/MediaDirectoryEntity';

@Injectable()
export default class MediaDirectoryRepository
  implements IMediaDirectoryRepository<MediaDirectory>
{
  public static readonly Token = Symbol('IMediaDirectoryRepository');

  public constructor(
    @InjectRepository(MediaDirectoryEntity)
    private readonly repository: Repository<IMediaDirectoryRaw>,
  ) {}

  public async CheckExistsById(id: UUIDTypes): Promise<boolean> {
    const result = await this.repository.query(
      'SELECT 1 FROM media_directory WHERE id = $1',
      [id as string],
    );

    return result.length > 0;
  }

  public async GetByIds(ids: UUIDTypes[]): Promise<MediaDirectory[]> {
    if (!ids || !ids.length) return [];

    const mediaDirectories: IMediaDirectoryRaw[] = await this.repository.find({
      where: { Id: In(ids as string[]) },
      //relations: ['MediaFiles', 'Children', 'Parent'],
    });

    return mediaDirectories.map(MediaDirectory.FromRaw);
  }

  public async CheckMasterDirectoryExistsByName(
    name: MediaDirectoryName,
  ): Promise<boolean> {
    const result = await this.repository.query(
      'SELECT 1 FROM media_directory WHERE name = $1 AND parent_id IS NULL LIMIT 1',
      [name.Value],
    );

    return !!result.length;
  }

  public async CheckIfExistsByNameAndParent(
    name: MediaDirectoryName,
    id: UUIDTypes,
  ): Promise<boolean> {
    const result = await this.repository.query(
      'SELECT 1 FROM media_directory WHERE name = $1 AND parent_id = $2 LIMIT 1',
      [name.Value, id],
    );

    return result.length > 0;
  }

  public async GetById(id: UUIDTypes): Promise<MediaDirectory> {
    if (!id) return null;

    const raw: IMediaDirectoryRaw = await this.repository.findOne({
      where: {
        Id: id as string,
      },
      relations: ['Children', 'MediaFiles', 'Parent'],
    });

    return MediaDirectory.FromRaw(raw);
  }

  public async GetMasterDirectoryByName(
    name: MediaDirectoryName,
  ): Promise<MediaDirectory> {
    const raw: IMediaDirectoryRaw = await this.repository.findOneBy({
      Name: name,
      Parent: null,
    });

    return MediaDirectory.FromRaw(raw);
  }

  public async GetMasterDirectories(): Promise<MediaDirectory[]> {
    const rawDirectories: IMediaDirectoryRaw[] = await this.repository.find({
      where: { Parent: null },
    });

    return rawDirectories.map(MediaDirectory.FromRaw);
  }

  public async Save(mediaDirectory: MediaDirectory): Promise<MediaDirectory> {
    const raw: IMediaDirectoryRaw = await this.repository.save(mediaDirectory);

    return MediaDirectory.FromRaw(raw);
  }

  public async RemoveById(id: UUIDTypes): Promise<boolean> {
    const mediaDirectory: IMediaDirectoryRaw = await this.GetById(id);

    if (!mediaDirectory) return false;

    return await this.Remove(mediaDirectory as MediaDirectory);
  }

  public async Remove(mediaDirectory: MediaDirectory): Promise<boolean> {
    await this.repository.remove(MediaDirectoryEntity.FromRaw(mediaDirectory));

    return true;
  }
}
