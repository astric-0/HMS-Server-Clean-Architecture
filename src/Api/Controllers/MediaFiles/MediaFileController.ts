import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import MediaFileDownloadRequestDto from './Dtos/MediaFileDownloadRequestDto';
import MediaFileDownloadCommand from 'src/Media/Application/MediaFiles/MediaFileDownload/MediaFileDownloadCommand';

@Controller('media-file')
export default class MediaFileController {
  constructor(@Inject<CommandBus>() private readonly commandBus: CommandBus) {}

  @Get()
  sayHi() {
    return { message: 'hi universe' };
  }

  @Post()
  async addMediaFile(@Body() body: MediaFileDownloadRequestDto) {
    const command = new MediaFileDownloadCommand(
      body.FileName,
      body.MasterDirectory,
      body.URL,
    );

    const response = await this.commandBus.execute(command);
    return response.IsSuccess;
  }
}
