import { Body, Controller, Get, Inject, Post, Param } from '@nestjs/common';
import { UUIDTypes } from 'uuid';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import MediaFileDownloadCommand from 'src/Media/Application/MediaFiles/MediaFileDownload/MediaFileDownloadCommand';
import MediaFileGetByIdQuery from 'src/Media/Application/MediaFiles/MediaFileGet/MediaFileGetByIdQuery';

import MediaFileDownloadDto from './Dtos/MediaFileDownloadDto';

@Controller('media-file')
export default class MediaFileController {
  constructor(
    @Inject<CommandBus>() private readonly commandBus: CommandBus,
    @Inject<QueryBus>() private readonly queryBus: QueryBus,
  ) {}

  @Get()
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

  @Post()
  async addMediaFile(@Body() body: MediaFileDownloadDto) {
    const command = new MediaFileDownloadCommand(
      body.FileName,
      body.MasterDirectory,
      body.URL,
    );

    const response = await this.commandBus.execute(command);
    return response.IsSuccess;
  }
}
