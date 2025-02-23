import { UUIDTypes, v4 as uuidv4 } from 'uuid';

import IMediaFileRaw from '../../../Common/Application/Abstractions/Repositories/IMediaFileRaw';
import BaseEntity from '../BaseEntity';
import {
  MediaFileFullPath,
  MediaFileMasterDirectory,
  MediaFileName,
} from './ValueTypes';

export default class MediaFile extends BaseEntity implements IMediaFileRaw {
  #name: MediaFileName;
  #masterDirectory: MediaFileMasterDirectory;
  #fullPath: MediaFileFullPath;

  static readonly #masterDirectories: string[] = [
    'movie',
    'movie_series',
    'series',
  ] as const;

  public static get MasterDirectories(): readonly string[] {
    return Object.freeze(this.#masterDirectories);
  }

  private constructor(
    id: UUIDTypes,
    fileName: MediaFileName,
    masterDirectory: MediaFileMasterDirectory,
    fullPath?: MediaFileFullPath,
  ) {
    super(id);
    this.#name = fileName;
    this.#masterDirectory = masterDirectory;
    this.#fullPath = fullPath;
  }

  public static Create(
    fileName: MediaFileName,
    masterDirectory: MediaFileMasterDirectory,
    fullPath: MediaFileFullPath,
  ): MediaFile {
    const mediaFile = new MediaFile(
      uuidv4(),
      fileName,
      masterDirectory,
      fullPath,
    );

    return mediaFile;
  }

  public static FromRaw(raw: IMediaFileRaw): MediaFile {
    const mediaFile: MediaFile = new MediaFile(
      raw.Id,
      raw.Name,
      raw.MasterDirectory,
      raw.FullPath,
    );

    mediaFile.Created = raw.Created;

    return mediaFile;
  }

  public get Name(): MediaFileName {
    return this.#name;
  }

  public get FullPath(): MediaFileFullPath {
    return this.#fullPath;
  }

  public get MasterDirectory(): MediaFileFullPath {
    return this.#masterDirectory;
  }
}
