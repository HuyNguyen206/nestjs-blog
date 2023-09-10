import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Logger, ValidationPipe} from "@nestjs/common";
import 'dotenv/config';
import {DocumentBuilder, SwaggerDocumentOptions, SwaggerModule} from "@nestjs/swagger";
import * as FormData from 'express-form-data';

async function bootstrap() {
  const logger = new Logger('bootrap')
  const app = await NestFactory.create(AppModule);
  app.use(FormData.parse());
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
  const config = new DocumentBuilder()
      .setTitle('Blog API')
      .setDescription('The blog API description')
      .setVersion('1.0')
      .addBearerAuth()
      .addTag('blog, comment')
      .build();

  const options: SwaggerDocumentOptions =  {
    operationIdFactory: (
        controllerKey: string,
        methodKey: string
    ) => methodKey
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.APP_PORT || 4000);
  logger.log(`Application listening on port ${process.env.APP_PORT}`)
}
bootstrap();
