import { existsSync } from 'fs';
import { basename, dirname, join } from 'path';
import { rm, stat, rmdir } from 'fs/promises';

// import IFileService, {
//   ExistsInfo,
// } from 'src/Common/Application/Abstractions/Services/File/IFileService';

export default class FileService {
  public static readonly Token: symbol = Symbol('FileService');

  public static async RemoveDirectory(fullPath: string): Promise<void> {
    await rmdir(fullPath, { recursive: true });
  }

  public static async RemoveFile(fullPath: string): Promise<void> {
    await rm(fullPath);
  }

  public static DirPath(fullPath: string): string {
    return dirname(fullPath);
  }

  public static JoinPath(...paths: string[]): string {
    return join(...paths);
  }

  public static async GetStats(
    fullPath: string,
  ): Promise<{ filename: string; size: number }> {
    const stats = await stat(fullPath);

    const filename = basename(fullPath);
    const size = stats.size;

    return {
      filename,
      size,
    };
  }

  public static async GetSize(fullPath: string): Promise<number> {
    const stats = await stat(fullPath);

    return stats.size;
  }

  public static Exists(
    filenames: string[],
    basePath: string,
  ): [boolean, ExistsInfo[]] {
    let allExists = true;

    const existsInfo: ExistsInfo[] = filenames.map(
      (filename: string): ExistsInfo => {
        const fileFullPath: string = !!basePath
          ? join(basePath, filename)
          : filename;

        const exists = existsSync(fileFullPath);

        allExists = exists;

        return {
          fileFullPath,
          exists,
          filename,
        };
      },
    );

    return [allExists, existsInfo];
  }
}

export type Stats = { filename: string; size: number };
export type ExistsInfo = {
  fileFullPath: string;
  exists: boolean;
  filename?: string;
};
