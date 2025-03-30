export default interface IFileService {
  Exists(filePaths: string[], basePath?: string): [boolean, ExistsInfo[]];

  DirPath(fullPath: string): string;

  JoinPath(...paths: string[]): string;

  GetStats(fullPath: string): Promise<Stats> | Stats;

  GetSize(fullPath: string): Promise<number> | number;

  RemoveFile(fullPath: string): Promise<void> | void;
}

export type Stats = { filename: string; size: number };
export type ExistsInfo = {
  fileFullPath: string;
  exists: boolean;
  filename?: string;
};
