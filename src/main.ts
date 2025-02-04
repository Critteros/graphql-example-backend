import path from 'node:path';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { migrate } from 'drizzle-orm/libsql/migrator';

import { AppModule } from './app.module';
import type { DBClient } from './db/client';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true, // Enable colors in logs
          },
        },
      },
    }),
  );
  const db: DBClient = app.get('DB');
  const expectedMigrationsDir = path.join(process.cwd(), 'drizzle');
  console.log('Migrating database with migrations from', expectedMigrationsDir);
  await migrate(db, {
    migrationsFolder: expectedMigrationsDir,
  });
  await app.enableCors({
    origin: '*',
    methods: 'GET, PUT, POST, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });
  await app.listen(process.env.PORT ?? 8080);
}
void bootstrap();
