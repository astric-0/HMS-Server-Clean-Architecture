import { UUIDTypes, v4 as uuidv4 } from 'uuid';

import IMediaFileRaw from 'src/Common/Application/Abstractions/Repositories/MediaFile/IMediaFileRaw';
import BaseEntity from 'src/Common/Application/Abstractions/Repositories/BaseEntity';
import {
  MediaFileFullPath,
  MediaFileName,
  MediaFileSize,
} from 'src/Common/Domain/MediaFiles/ValueTypes';
import MediaDirectory from '../MediaDirectories/MediaDirectory';

export default class MediaFile extends BaseEntity implements IMediaFileRaw {
  #name: MediaFileName;
  #mediaDirectory: MediaDirectory;
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
    mediaDirectory: MediaDirectory,
    size: MediaFileSize,
    fullPath: MediaFileFullPath,
  ) {
    super(id);
    this.#name = fileName;
    this.#mediaDirectory = mediaDirectory;
    this.#size = size;
    this.#fullPath = fullPath;
  }

  public static Create(
    fileName: MediaFileName,
    mediaDirectory: MediaDirectory,
    size: MediaFileSize,
  ): MediaFile {
    const mediaFile = new MediaFile(
      uuidv4(),
      fileName,
      mediaDirectory,
      size,
      new MediaFileFullPath(
        `${mediaDirectory.FullPath ?? './'}/${fileName.Value}`,
      ),
    );

    return mediaFile;
  }

  public static FromRaw(raw: IMediaFileRaw): MediaFile {
    if (!raw) return null;

    const mediaFile: MediaFile = new MediaFile(
      raw.Id,
      raw.Name,
      MediaDirectory.FromRaw(raw.MediaDirectory),
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

  public get MediaDirectory(): MediaDirectory {
    return this.#mediaDirectory;
  }

  public get Size(): MediaFileSize {
    return this.#size;
  }
}
