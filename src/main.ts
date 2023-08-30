import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import 'dotenv/config';
import {DocumentBuilder, SwaggerDocumentOptions, SwaggerModule} from "@nestjs/swagger";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
}
bootstrap();
