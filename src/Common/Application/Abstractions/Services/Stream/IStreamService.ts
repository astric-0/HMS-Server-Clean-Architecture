import { Response } from 'express';

export default interface IStreamService {
  Stream(filePath: string, response: Response, range: string): Promise<void>;
}
