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

  async CheckExistsById(id: UUIDTypes): Promise<boolean> {
    const result = await this.repository.query(
      'SELECT 1 FROM media_directory WHERE id = $1',
      [id as string],
    );

    return !!result.length;
  }

  async GetByIds(ids: UUIDTypes[]): Promise<MediaDirectory[]> {
    if (!ids || !ids.length) return [];

    const mediaDirectories: IMediaDirectoryRaw[] = await this.repository.find({
      where: { Id: In(ids as string[]) },
      //relations: ['MediaFiles', 'Children', 'Parent'],
    });

    return mediaDirectories.map(MediaDirectory.FromRaw);
  }

  async CheckMasterDirectoryExistsByName(
    name: MediaDirectoryName,
  ): Promise<boolean> {
    const result = await this.repository.query(
      'SELECT 1 FROM media_directory WHERE name = $1 AND parent_id IS NULL LIMIT 1',
      [name.Value],
    );

    return !!result.length;
  }

  async CheckIfExistsByNameAndParent(
    name: MediaDirectoryName,
    id: UUIDTypes,
  ): Promise<boolean> {
    const result = await this.repository.query(
      'SELECT 1 FROM media_directory WHERE name = $1 AND parent_id = $2 LIMIT 1',
      [name.Value, id],
    );

    return !!result.length;
  }

  async GetById(id: UUIDTypes): Promise<MediaDirectory> {
    if (!id) return null;

    const raw: IMediaDirectoryRaw = await this.repository.findOne({
      where: {
        Id: id as string,
      },
      relations: ['Children', 'MediaFiles', 'Parent'],
    });

    return MediaDirectory.FromRaw(raw);
  }

  async GetMasterDirectoryByName(
    name: MediaDirectoryName,
  ): Promise<MediaDirectory> {
    const raw: IMediaDirectoryRaw = await this.repository.findOneBy({
      Name: name,
      Parent: null,
    });

    return MediaDirectory.FromRaw(raw);
  }

  async GetMasterDirectories(): Promise<MediaDirectory[]> {
    const rawDirectories: IMediaDirectoryRaw[] = await this.repository.find({
      where: { Parent: null },
    });

    return rawDirectories.map(MediaDirectory.FromRaw);
  }

  async Save(mediaDirectory: MediaDirectory): Promise<MediaDirectory> {
    const raw: IMediaDirectoryRaw = await this.repository.save(mediaDirectory);

    return MediaDirectory.FromRaw(raw);
  }

  async Remove(id: UUIDTypes): Promise<boolean> {
    const deleteResult = await this.repository.delete({ Id: id as string });

    return deleteResult.affected > 0;
  }
}
