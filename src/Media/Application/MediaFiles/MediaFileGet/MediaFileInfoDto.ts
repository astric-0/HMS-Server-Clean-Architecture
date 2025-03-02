import { UUIDTypes } from 'uuid';

export default class MediaFileInfoDto {
  constructor(
    public readonly Id: UUIDTypes,
    public readonly FileName: string,
    public readonly MediaDirectory: string,
    public readonly Size: number,
    public readonly Created: Date,
  ) {}
}
