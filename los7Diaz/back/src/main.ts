import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeedersService } from './seeders/seeders.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const seeders=app.get(SeedersService)
  await seeders.seed()

  app.enableCors({
    origin: true,
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap();
