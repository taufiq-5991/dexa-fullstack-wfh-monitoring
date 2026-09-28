import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DocsMiddleware } from './common/middlewares/swagger/docs.middleware';
import { ConfigService } from '@nestjs/config';
import { VersioningType } from '@nestjs/common';
import { writeFileSync } from 'fs';
import { join } from 'path';

async function bootstrap() {
  // Create the hybrid application (HTTP + Microservice)
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const config: ConfigService = app.get(ConfigService);

  // Enable Swagger
  const options = new DocumentBuilder()
    .setTitle('WFH Monitoring API')
    .setDescription('API documentation for the WFH Monitoring microservice')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT', // Optional hint for users
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This is the security name/key reference
    )
    .addServer(`http://localhost:${process.env.HTTP_PORT ?? 3060}`, 'Localhost')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.use('/public/stoplight.html', new DocsMiddleware().use);

  // Save the OpenAPI spec to a file
  const outputPath = join(__dirname, '..', 'src', 'public', 'openapi.json');
  writeFileSync(outputPath, JSON.stringify(document, null, 2));

  // Start the HTTP server
  await app.listen(process.env.HTTP_PORT ?? 3060); // HTTP server runs on port 3000

  // Attach the microservice transport layer
  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: parseInt(process?.env?.MICROSERVICE_TCP_PORT ?? '3050'), // TCP microservice runs on port 3050
    },
  });

  await app.startAllMicroservices();
}

bootstrap();