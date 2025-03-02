import IMediaDirectoryRaw from './IMediaDirectoryRaw';

export default abstract class IMediaDirectoryClosureRaw {
  abstract Ancestor: IMediaDirectoryRaw;
  abstract Descendant: IMediaDirectoryRaw;
  abstract Depth: number;
}
