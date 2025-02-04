import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Note {
  @Field()
  title: string;

  @Field()
  description: string;
}
