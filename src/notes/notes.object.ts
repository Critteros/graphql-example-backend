import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class Note {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;
}
