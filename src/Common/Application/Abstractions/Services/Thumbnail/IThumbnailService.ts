export default interface IThumbnailService {
  Create(
    mediaFileFullPath: string,
    thumbnailFileFullPath: string,
    offset: number,
    updateProgress?: (progress: number) => void,
  ): Promise<void>;

  Remove(thumbnailFileFullPath: string): Promise<boolean>;
}
