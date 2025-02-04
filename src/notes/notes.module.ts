import { Module } from '@nestjs/common';

import { NotesResolver } from './notes.resolver';

@Module({
  providers: [NotesResolver],
})
export class NotesModule {}
