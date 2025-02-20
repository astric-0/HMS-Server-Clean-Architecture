import Error, { ErrorType } from '../Shared/Error';

export default class MediaFileErrors {
  public static readonly NotFound: Error = new Error(
    'MediaFile.NotFound',
    "Couldn't find media file",
    ErrorType.NotFound,
  );

  public static readonly AlreadyExists: Error = new Error(
    'MediaFile.AlreadyExists',
    'Media file already exists',
    ErrorType.Conflict,
  );
}
