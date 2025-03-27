import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Param,
  Query,
  Res,
  Req,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UUIDTypes } from 'uuid';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import IStreamService from 'src/Common/Application/Abstractions/Services/Stream/IStreamService';

import MediaFileDownloadCommand from 'src/Media/Application/MediaFiles/MediaFileDownload/MediaFileDownloadCommand';
import MediaFileGetByIdQuery from 'src/Media/Application/MediaFiles/MediaFileGet/MediaFileGetByIdQuery';
import MediaFileGetAllQuery from 'src/Media/Application/MediaFiles/MediaFileGet/MediaFileGetAllQuery';
import MediaFileExtractCommand from 'src/Media/Application/MediaFiles/MediaFileExtract/MediaFileExtractCommand';
import MediaFileGetFullPathQuery from 'src/Media/Application/MediaFiles/MediaFileGet/MediaFileGetFullPathQuery';

import FileStreamService from 'src/Media/Infrastructure/Stream/FileStream/FileStreamService';

import MediaFileDownloadDto from './Dtos/MediaFileDownloadDto';
import MediaFileThumbnailDto from './Dtos/MediaFileThumbnailDto';
import MediaFileCreateThumbnailCommand from 'src/Media/Application/MediaFiles/MediaFileThumbnail/MediaFileCreateThumbnailCommand';

@Controller('media-file')
export default class MediaFileController {
  constructor(
    @Inject<CommandBus>() private readonly commandBus: CommandBus,
    @Inject<QueryBus>() private readonly queryBus: QueryBus,
    @Inject(FileStreamService.Token)
    private readonly fileStreamService: IStreamService,
  ) {}

  @Get('say-hi')
  sayHi() {
    return { message: 'hi universe' };
  }

  @Get(':id')
  async getMediaFileInfoById(@Param('id') id: UUIDTypes) {
    const query = new MediaFileGetByIdQuery(id);
    const result = await this.queryBus.execute(query);

    if (result.IsSuccess) return result.Value;
    else return result.Error;
  }

  @Get(':id/stream')
  async streamMediaFileById(
    @Param('id') id: UUIDTypes,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    const query = new MediaFileGetFullPathQuery(id);
    const result = await this.queryBus.execute(query);

    if (!result.IsSuccess) return result.Error;
    await this.fileStreamService.Stream(
      result.Value,
      response,
      request.headers.range,
    );
  }

  @Get()
  async getMediaFileInfo(
    @Query('currentPage') currentPage?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    const query = new MediaFileGetAllQuery(currentPage, pageSize);
    const result = await this.queryBus.execute(query);

    return result.Value;
  }

  @Post()
  async addMediaFile(@Body() body: MediaFileDownloadDto) {
    const command = new MediaFileDownloadCommand(
      body.FileName,
      body.MediaDirectoryId,
      body.URL,
    );

    const response = await this.commandBus.execute(command);
    return response.IsSuccess;
  }

  @Get(':id/extract')
  async extractMediaFileById(@Param('id') id: UUIDTypes) {
    const query = new MediaFileExtractCommand(id);
    const result = await this.commandBus.execute(query);

    if (!result.IsSuccess) return result.Error;
    return result.IsSuccess;
  }

  @Post('thumbnail')
  async createMediaFileThumbnail(@Body() body: MediaFileThumbnailDto) {
    const command = new MediaFileCreateThumbnailCommand(
      body.MediaFileId,
      body.OffSet,
      body.FullPath,
    );
    const result = await this.commandBus.execute(command);

    if (!result.IsSuccess) return result.Error;
    return result.IsSuccess;
  }
}
