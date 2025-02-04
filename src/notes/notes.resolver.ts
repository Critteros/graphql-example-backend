import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { type DBClient, notes } from '@/db';

import { Note } from './notes.object';

@Resolver(() => Note)
export class NotesResolver {
  constructor(@Inject('DB') private readonly db: DBClient) {}

  @Query(() => [Note])
  async notes(): Promise<Note[]> {
    const notes = await this.db.query.notes.findMany();
    return notes.map((note) => ({
      ...note,
      id: note.uid,
    }));
  }

  @Mutation(() => Note)
  async createNote(
    @Args('title') title: string,
    @Args('contents') contents: string,
  ): Promise<Note> {
    return this.db
      .insert(notes)
      .values({ title, contents })
      .returning({
        title: notes.title,
        contents: notes.contents,
        id: notes.uid,
      })
      .get();
  }
}
