import { Injectable, Logger } from '@nestjs/common';
import * as unrar from 'node-unrar-js';

import IExtractService from 'src/Common/Application/Abstractions/Services/Extract/IExtractService';
import IExtractResult from 'src/Common/Application/Abstractions/Services/Extract/IExtractResult';

@Injectable()
export default class RarExtractionService
  implements IExtractService<ExtractionResult>
{
  public static readonly Token = Symbol('RarExtractionService');

  private get ShouldLog(): boolean {
    return true;
  }

  public async ExtractFile(
    sourceFilePath: string,
    destinationFilePath: string,
    updateProgress?: (progress: number) => void,
  ): Promise<ExtractionResult> {
    const extractor = await unrar.createExtractorFromFile({
      filepath: sourceFilePath,
      targetPath: destinationFilePath,
    });

    const list = extractor.getFileList();
    const headerNames: string[] = [...list.fileHeaders].map(
      (header) => header.name,
    );

    const extractionResult = extractor.extract({});
    const extractedFiles = [...extractionResult.files].map(
      (file) => file.fileHeader.name,
    );

    if (this.ShouldLog) {
      Logger.log(list.arcHeader);
      Logger.log('Archived Files: ', headerNames);
      Logger.log('Extracted Files: ', extractedFiles);
    }

    updateProgress?.(100);

    return new ExtractionResult(
      destinationFilePath,
      headerNames,
      extractedFiles,
    );
  }
}

export class ExtractionResult implements IExtractResult {
  constructor(
    public readonly Name: string,
    public readonly FilesInArchive: string[],
    public readonly FilesExtracted: string[],
  ) {}
}
