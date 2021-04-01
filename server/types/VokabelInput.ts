import { Vokabel } from "../entity/Vokabel";
import { Field, InputType } from "type-graphql";
import { ObjectId } from "mongodb";

@InputType()
export class VokabelInput implements Partial<Vokabel> {
  @Field({ nullable: true })
  _id?: ObjectId;

  @Field()
  deutsch: string;

  @Field()
  koreanisch: string;
}
