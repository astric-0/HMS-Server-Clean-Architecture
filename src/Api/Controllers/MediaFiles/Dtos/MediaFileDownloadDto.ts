export default class MediaFileDownloadRequestDto {
  constructor(
    public readonly FileName: string,
    public readonly URL: string,
    public readonly MasterDirectory: string,
  ) {}
}
