import { ObjectType, Field } from "type-graphql";
import { ObjectId } from "mongodb";
import { prop, getModelForClass } from "@typegoose/typegoose";
import { User } from "./User";
import { Ref } from "../types/Ref";

@ObjectType({ description: "Vokabel" })
export class Vokabel {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @prop({ required: true, trim: true, lowercase: true })
  deutsch: string;

  @Field()
  @prop({ required: true, trim: true, lowercase: true })
  koreanisch: string;

  //Reference to an User
  @Field(() => User)
  @prop({ ref: User, required: true })
  creator: Ref<User>;
}

export const VokabelModel = getModelForClass(Vokabel, {
  schemaOptions: { timestamps: true },
});
