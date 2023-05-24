import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('images')
@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload an image',
  })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  save(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 1.5 }),
          new FileTypeValidator({ fileType: 'image/png' }),
        ],
      }),
    )
    image: Express.Multer.File,
  ) {
    return this.imageService.save(image);
  }

  @Get(':filename')
  findOne(@Param('filename') filename: string) {
    return this.imageService.getImage(filename);
  }

  @Delete(':filename')
  remove(@Param('filename') filename: string) {
    return this.imageService.remove(filename);
  }
}
