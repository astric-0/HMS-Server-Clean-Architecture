import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import DownloadMediaFileRequestDto from './Dtos/DownloadMediaFileRequestDto';
import DownloadMediaFileCommand from 'src/Media/Application/MediaFiles/DownloadMediaFile/DownloadMediaFileCommand';

@Controller('media-file')
export default class MediaFileController {
  constructor(@Inject<CommandBus>() private readonly commandBus: CommandBus) {}

  @Get()
  sayHi() {
    return { message: 'hi universe' };
  }

  @Post()
  async addMediaFile(@Body() body: DownloadMediaFileRequestDto) {
    const command = new DownloadMediaFileCommand(
      body.FileName,
      body.MasterDirectory,
      body.URL,
    );

    const response = await this.commandBus.execute(command);
    return response.IsSuccess;
  }
}
