import { UUIDTypes, v4 as uuidv4 } from 'uuid';

import BaseEntity from 'src/Common/Application/Abstractions/Repositories/BaseEntity';
import IMediaDirectoryRaw from 'src/Common/Application/Abstractions/Repositories/MediaDirectory/IMediaDirectoryRaw';

import { MediaDirectoryName } from 'src/Common/Domain/MediaDirectory/ValueTypes';
import MediaFile from '../MediaFiles/MediaFile';
import Result from 'src/Common/Domain/Result';
import Error from 'src/Common/Domain/Error';

export default class MediaDirectory
  extends BaseEntity
  implements IMediaDirectoryRaw
{
  #name: MediaDirectoryName;
  #parent: MediaDirectory;
  #children: MediaDirectory[];
  #mediaFiles: MediaFile[];

  private constructor(
    id: UUIDTypes,
    name: MediaDirectoryName,
    parent: MediaDirectory,
    children: MediaDirectory[],
    mediaFiles: MediaFile[],
  ) {
    super(id);
    this.#name = name;
    this.#parent = parent;
    this.#children = children;
    this.#mediaFiles = mediaFiles;
  }

  public static Create(
    name: MediaDirectoryName,
    parent: MediaDirectory,
    children: MediaDirectory[],
    mediaFiles: MediaFile[],
  ): MediaDirectory {
    const mediaDirectory: MediaDirectory = new MediaDirectory(
      uuidv4(),
      name,
      parent,
      children,
      mediaFiles,
    );

    return mediaDirectory;
  }

  public get Name(): MediaDirectoryName {
    return this.#name;
  }

  public get Parent(): MediaDirectory {
    return this.#parent;
  }

  public get Children(): MediaDirectory[] {
    return this.#children;
  }

  public get MediaFiles(): MediaFile[] {
    return this.#mediaFiles;
  }

  public LinkMediaFile(mediaFile: MediaFile): Result<void> {
    this.#mediaFiles.push(mediaFile);
    return Result.Success();
  }

  public UpdateParent(mediaDirectory: MediaDirectory): Result<void> {
    this.#parent = mediaDirectory;
    return Result.Success();
  }

  public AddChildDirectory(mediaDirectory: MediaDirectory): Result<void> {
    this.#children.push(mediaDirectory);
    return Result.Success();
  }

  public RemoveChildDirectory(id: UUIDTypes): Result<void> {
    const children: MediaDirectory[] = this.#children.filter(
      (x: MediaDirectory) => x.Id == id,
    );

    if (children.length < this.#children.length) {
      this.#children = children;
      return Result.Success();
    }

    return Result.Failure(Error.NotFound);
  }

  public static FromRaw(raw: IMediaDirectoryRaw): MediaDirectory {
    if (!raw) return null;

    const mediaDirectory = new MediaDirectory(
      raw.Id,
      raw.Name,
      MediaDirectory.FromRaw(raw.Parent),
      raw.Children?.map(MediaDirectory.FromRaw),
      raw.MediaFiles?.map(MediaFile.FromRaw),
    );

    mediaDirectory.Created = raw.Created;

    return mediaDirectory;
  }
}
