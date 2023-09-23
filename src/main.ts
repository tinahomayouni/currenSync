import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation pipe
  app.useGlobalPipes(new ValidationPipe());
  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Currency Sync App')
    .setDescription('App for convert currencies')
    .setVersion('1.0')
    .addTag('trackerAPI') // Add tags for your controllers
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
