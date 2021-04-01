//global imports
import { prop, getModelForClass } from "@typegoose/typegoose";
import { ObjectType, Field } from "type-graphql";
import { ObjectId } from "mongodb";

@ObjectType({ description: "User" })
export class User {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @prop({ required: true })
  username: string;

  @Field()
  @prop({ required: true, unique: true })
  email: string;

  //nicht sehen mit graphql
  @prop({ required: true })
  password: string;
}

export const UserModel = getModelForClass(User);
