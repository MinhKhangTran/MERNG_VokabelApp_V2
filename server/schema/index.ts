//global imports
import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { ObjectId } from "mongodb";
import path from "path";

//import Resolvers
import { AuthResolver } from "../resolvers/AuthResolver";
import { UserResolver } from "../resolvers/UserResolver";
import { VokabelResolver } from "../resolvers/VokabelResolver";

//middleware and Scalars
import { TypegooseMiddleware } from "../middleware/typegoose";
import { ObjectIdScalar } from "./object-id.scalar";

//build typegraphql schema
export default async function createSchema(): Promise<GraphQLSchema> {
  const schema = await buildSchema({
    //add ts resolvers
    resolvers: [AuthResolver, UserResolver, VokabelResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
    //use document converting middleware
    globalMiddlewares: [TypegooseMiddleware],
    //use ObjectId scalar mapping
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    validate: false,
  });
  return schema;
}
