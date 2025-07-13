import Error, { ErrorType } from 'src/Common/Domain/Error';

export default class MediaDirectoryErrors {
  public static readonly NotFound: Error = new Error(
    'MediaDirectory.NotFound',
    "Couldn't find media directory",
    ErrorType.NotFound,
  );

  public static readonly AlreadyExists: Error = new Error(
    'MediaDirectory.AlreadyExists',
    'Media directory already exists',
    ErrorType.Conflict,
  );

  public static readonly FailedToCreate: Error = new Error(
    'MediaDirectory.FailedToCreate',
    "Couldn't create media directory",
    ErrorType.Failure,
  );

  public static readonly FailedToDelete: Error = new Error(
    'MediaDirectory.Deletion.Failed',
    "Couldn't remove media directory",
    ErrorType.Failure,
  );
}
