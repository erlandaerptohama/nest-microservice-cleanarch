import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './module';
import { ResponsePattern } from './core/common/response.interface';
import { LoggerService } from './modules/logger/logger.service';
import { AllExceptionFilter } from './modules/filters/exception.filter';
import { LoggingInterceptor } from './modules/interceptors/logger.interceptor';
import { ResponseInterceptor } from './modules/interceptors/response.interceptor';
import { WinstonLogger } from './modules/winston/logger.winston';

async function bootstrap() {

  const app = await NestFactory.create(AppModule, {
    logger: WinstonLogger,
    snapshot: true,
  });
  const env = process.env.NODE_ENV;

  app.use(cookieParser());
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));
  app.useGlobalPipes(new ValidationPipe());

  // Interceptor
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Versioning
  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'version',
    defaultVersion: '1.0.0',
  });

  if (env !== 'production') {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Nest JS Microservice Clean Arch')
      .setDescription('User')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      extraModels: [ResponsePattern],
      deepScanRoutes: true,
    });
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(process.env.PORT);
}
bootstrap();
