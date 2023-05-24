import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StorageModule } from './storage';
import { ImageModule } from './image/image.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    StorageModule.forRootAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        bucket: config.get<string>('GCP_BUCKET_NAME', 'my-bucket'),
        projectId: config.get<string>('GCP_PROJECT_ID'),
        credentials: {
          client_email: config.get<string>('GCP_CLIENT_EMAIL'),
          private_key: config.get<string>('GCP_PRIVATE_KEY'),
        },
      }),
    }),
    ImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
