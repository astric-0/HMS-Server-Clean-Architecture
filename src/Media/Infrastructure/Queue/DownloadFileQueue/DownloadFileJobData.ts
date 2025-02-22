export default class DownloadFileJobData {
  constructor(
    public readonly MediaFileName: string,
    public readonly MasterDirectory: string,
    public readonly URL: string,
    public readonly FullPath: string,
  ) {}
}
