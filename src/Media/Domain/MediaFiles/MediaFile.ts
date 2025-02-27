import { UUIDTypes, v4 as uuidv4 } from 'uuid';

import IMediaFileRaw from '../../../Common/Application/Abstractions/Repositories/IMediaFileRaw';
import BaseEntity from '../BaseEntity';
import {
  MediaFileFullPath,
  MediaFileMasterDirectory,
  MediaFileName,
  MediaFileSize,
} from '../../../Common/Domain/MediaFiles/ValueTypes';

export default class MediaFile extends BaseEntity implements IMediaFileRaw {
  #name: MediaFileName;
  #masterDirectory: MediaFileMasterDirectory;
  #fullPath: MediaFileFullPath;
  #size: MediaFileSize;

  static readonly _masterDirectories: string[] = [
    'movie',
    'movie_series',
    'series',
  ] as const;

  public static get MasterDirectories(): readonly string[] {
    return Object.freeze(this._masterDirectories);
  }

  private constructor(
    id: UUIDTypes,
    fileName: MediaFileName,
    masterDirectory: MediaFileMasterDirectory,
    size: MediaFileSize,
    fullPath: MediaFileFullPath,
  ) {
    super(id);
    this.#name = fileName;
    this.#masterDirectory = masterDirectory;
    this.#size = size;
    this.#fullPath = fullPath;
  }

  public static Create(
    fileName: MediaFileName,
    masterDirectory: MediaFileMasterDirectory,
    size: MediaFileSize,
    fullPath: MediaFileFullPath,
  ): MediaFile {
    const mediaFile = new MediaFile(
      uuidv4(),
      fileName,
      masterDirectory,
      size,
      fullPath,
    );

    return mediaFile;
  }

  public static FromRaw(raw: IMediaFileRaw): MediaFile {
    if (!raw) return null;

    const mediaFile: MediaFile = new MediaFile(
      raw.Id,
      raw.Name,
      raw.MasterDirectory,
      raw.Size,
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

  public get Size(): MediaFileSize {
    return this.#size;
  }
}
