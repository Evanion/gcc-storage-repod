import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { StorageModule } from 'src/storage';

@Module({
  imports: [StorageModule],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
