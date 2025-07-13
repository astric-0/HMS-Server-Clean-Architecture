import Error, { ErrorType } from '../../../Common/Domain/Error';

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

  public static readonly PathNotFound: Error = new Error(
    'MediaFile.Path.NotFound',
    'Media file path is empty',
    ErrorType.Failure,
  );

  public static readonly ThumbnailNotCreated: Error = new Error(
    'MediaFile.Thumbnail.NotCreated',
    'Failed to created media file thumbnail',
    ErrorType.Failure,
  );

  public static readonly ThumbnailNotSavedInDB: Error = new Error(
    'MediaFile.Thumbnail.NotSavedInDb',
    'Unable to save thumbnail',
    ErrorType.Failure,
  );

  public static readonly DownloadError: Error = new Error(
    'MediaFileDownload.Failure',
    'Failed to download media file',
    ErrorType.Failure,
  );

  public static readonly InvalidVideoExtension: Error = new Error(
    'MediaFile.InvalidVideoExtension',
    'Failed to complete the task for provided media',
    ErrorType.Validation,
  );

  public static readonly UnableToDeleteMediaFile: Error = new Error(
    'MediaFileDeletion.Failure',
    'Failed to delete media file',
    ErrorType.Failure,
  );
}
