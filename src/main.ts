import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SnakeToCamelPipe } from './common/pipes/snake-to-camel.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new SnakeToCamelPipe(),
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const documentConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Booking API')
    .setDescription('Tech task #2')
    .setVersion('0.1')
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, documentConfig);

  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
