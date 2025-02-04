import { Args, Mutation, Query, Resolver, ID, Int } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { type DBClient, notes } from '@/db';

import { Note } from './notes.object';

@Resolver(() => Note)
export class NotesResolver {
  constructor(@Inject('DB') private readonly db: DBClient) {}

  @Query(() => [Note])
  async notes(
    @Args('page', { type: () => Int, nullable: false }) page: number,
  ): Promise<Note[]> {
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

  @Mutation(() => Boolean)
  async deleteNote(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    try {
      await this.db.delete(notes).where(eq(notes.uid, id)).execute();
    } catch (error) {
      console.error('Failed to delete note:', error);
      return false;
    }
    return true;
  }
}
