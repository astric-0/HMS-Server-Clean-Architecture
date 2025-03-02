import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import MediaDirectoryCreateCommand from 'src/Media/Application/MediaDirectories/MediaDirectoryCreate/MediaDirectoryCreateCommand';

import MediaDirectoryCreateDto from './Dtos/MediaDirectoryCreateDto';
import { UUIDTypes } from 'uuid';
import { MediaDirectoryGetByIdQuery } from 'src/Media/Application/MediaDirectories/MediaDirectoryGet/MediaDirectoryGetByIdQuery';

@Controller('media-directory')
export default class MediaDirectoryController {
  constructor(
    @Inject<CommandBus>() private readonly commandBus: CommandBus,
    @Inject<QueryBus>() private readonly queryBus: QueryBus,
  ) {}

  @Get('say-hi')
  sayHi() {
    return { message: 'hi universe' };
  }

  @Post()
  async createMediaDirectory(@Body() body: MediaDirectoryCreateDto) {
    const command = new MediaDirectoryCreateCommand(
      body.DirectoryName,
      body.MediaFilesIds ?? [],
      body.ParentDirectoryId,
      body.ChildDirectoriesIds ?? [],
    );

    const result = await this.commandBus.execute(command);

    if (result.IsSuccess) return result.Value;

    return result.Error;
  }

  @Get(':id')
  async getMediaDirectoryById(@Param('id') id: UUIDTypes) {
    const query = new MediaDirectoryGetByIdQuery(id);
    const result = await this.queryBus.execute(query);

    if (result.IsSuccess) return result.Value;

    return result.Error;
  }
}
