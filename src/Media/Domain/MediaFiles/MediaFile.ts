import { UUIDTypes, v4 as uuidv4 } from 'uuid';

import {
  MediaFileFullPath,
  MediaFileName,
  MediaFileSize,
  MediaThumbnailFullPath,
} from 'src/Common/Domain/MediaFiles/ValueTypes';
import IMediaFileRaw from 'src/Common/Application/Abstractions/Repositories/MediaFile/IMediaFileRaw';
import BaseEntity from 'src/Common/Application/Abstractions/Repositories/BaseEntity';

import MediaDirectory from '../MediaDirectories/MediaDirectory';

export default class MediaFile extends BaseEntity implements IMediaFileRaw {
  #name: MediaFileName;
  #mediaDirectory: MediaDirectory;
  #fullPath: MediaFileFullPath;
  #size: MediaFileSize;
  #thumbnailFullPath: MediaThumbnailFullPath;

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
    thumbnailFullPath: MediaThumbnailFullPath,
  ) {
    super(id);
    this.#name = fileName;
    this.#mediaDirectory = mediaDirectory;
    this.#size = size;
    this.#fullPath = fullPath;
    this.#thumbnailFullPath = thumbnailFullPath;
  }

  public static Create(
    fileName: MediaFileName,
    mediaDirectory: MediaDirectory,
    fullPath: MediaFileFullPath,
    thumbnailFullPath: MediaThumbnailFullPath,
    size: MediaFileSize,
  ): MediaFile {
    const mediaFile = new MediaFile(
      uuidv4(),
      fileName,
      mediaDirectory,
      size,
      fullPath,
      thumbnailFullPath,
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
      raw.ThumbnailFullPath,
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

  public get ThumbnailFullPath(): MediaThumbnailFullPath {
    return this.#thumbnailFullPath;
  }

  public get Size(): MediaFileSize {
    return this.#size;
  }
}
