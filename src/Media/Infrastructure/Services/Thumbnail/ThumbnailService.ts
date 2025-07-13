import * as extractFrame from 'ffmpeg-extract-frame';
import { mkdirSync } from 'fs';
import { rm } from 'fs/promises';
import { dirname } from 'path';

import IThumbnailService from 'src/Common/Application/Abstractions/Services/Thumbnail/IThumbnailService';

export default class ThumbnailService implements IThumbnailService {
  public static readonly Token = Symbol('ThumbnailService');

  public async Create(
    mediaFileFullPath: string,
    thumbnailFileFullPath: string,
    offset: number = 10,
  ): Promise<void> {
    mkdirSync(dirname(thumbnailFileFullPath), { recursive: true });

    await extractFrame({
      input: mediaFileFullPath,
      output: thumbnailFileFullPath,
      offset,
    });
  }

  async Remove(thumbnailFileFullPath: string): Promise<boolean> {
    try {
      await rm(thumbnailFileFullPath);
      return true;
    } catch {
      return false;
    }
  }
}
