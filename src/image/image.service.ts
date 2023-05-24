import { Injectable } from '@nestjs/common';
import { UpdateImageDto } from './dto/update-image.dto';
import { StorageService } from 'src/storage';

@Injectable()
export class ImageService {
  constructor(private readonly storageService: StorageService) {}

  save(image: Express.Multer.File) {
    return this.storageService.save(image.originalname, image.buffer, []);
  }

  getImage(name: string) {
    return this.storageService.get(name);
  }

  remove(name: string) {
    return this.storageService.delete(name);
  }
}
