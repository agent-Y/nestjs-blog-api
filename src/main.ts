import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // グローバルなバリデーションパイプを設定
  app.useGlobalPipes(new ValidationPipe());
  
  // CORSを有効化
  app.enableCors({
    origin: '*', // 本番環境では適切なオリジンを設定してください
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  
  // グローバルプレフィックスの設定（オプション）
  app.setGlobalPrefix('api');
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
