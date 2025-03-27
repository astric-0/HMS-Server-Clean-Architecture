import IExtractResult from './IExtractResult';

export default interface IExtractService<TReturnType extends IExtractResult> {
  ExtractFile(
    sourceFilePath: string,
    destinationFilePath: string,
    updateProgress?: (progress: number) => void,
  ): Promise<TReturnType>;
}
