export default class DownloadMediaFileRequestDto {
  constructor(
    public readonly FileName: string,
    public readonly URL: string,
    public readonly MasterDirectory: string,
  ) {}
}
