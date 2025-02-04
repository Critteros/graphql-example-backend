import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { DrizzleTursoModule } from '@knaadh/nestjs-drizzle-turso';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import * as schema from './db/schema';

@Module({
  imports: [
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      graphiql: true,
    }),
    DrizzleTursoModule.register({
      tag: 'DB',
      turso: {
        config: {
          url: 'file:./database.db',
        },
      },
      config: {
        schema,
      },
    }),
    NotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
