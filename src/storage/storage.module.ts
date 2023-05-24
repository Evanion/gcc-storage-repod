import { Module } from '@nestjs/common';

import { ConfigurableModuleClass } from './storage.module-definition';
import { StorageService } from './storage.service';

@Module({
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule extends ConfigurableModuleClass {
  /*static forFeature(options: StorageFeatureOptions) {
    return {
      module: StorageModule,
      providers: [
        {
          provide: STORAGE_BUCKET,
          useValue: options.bucket,
        },
        StorageService,
      ],
      exports: [StorageService],
    };
  }*/
}
