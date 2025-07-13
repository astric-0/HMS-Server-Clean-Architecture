export default interface IDownloadService {
  DownloadMedia(
    url: string,
    mediaFileFullPath: string,
    updateProgress?: (progress: number) => void,
  ): Promise<number>;
}
