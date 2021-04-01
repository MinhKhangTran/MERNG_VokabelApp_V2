import {
  Resolver,
  Arg,
  Ctx,
  UseMiddleware,
  Query,
  Mutation,
  FieldResolver,
  Root,
} from "type-graphql";
import { ObjectId } from "mongodb";
import { Vokabel, VokabelModel } from "../entity/Vokabel";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types/MyContext";
import { ObjectIdScalar } from "../schema/object-id.scalar";
import { VokabelInput } from "../types/VokabelInput";
import { User, UserModel } from "../entity/User";

@Resolver(() => Vokabel)
export class VokabelResolver {
  //read all vocs PUBLIC
  @Query(() => [Vokabel])
  async readVocs() {
    return await VokabelModel.find().sort({ createdAt: -1 });
  }

  //read all vocs from a User PUBLIC
  @Query(() => [Vokabel])
  async readUserVoks(@Arg("userId", () => ObjectIdScalar) userId: ObjectId) {
    return await VokabelModel.find({ creator: userId }).sort({
      createdAt: -1,
    });
  }

  //read Voc by ID PRIVATE
  @Query(() => Vokabel)
  @UseMiddleware(isAuth)
  async readVoc(@Arg("vokId", () => ObjectIdScalar) vokId: ObjectId) {
    return await VokabelModel.findById(vokId);
  }

  //create a new voc PRIVATE
  @Mutation(() => Vokabel)
  @UseMiddleware(isAuth)
  async createVoc(
    @Arg("input") vokInput: VokabelInput,
    @Ctx() ctx: MyContext
  ): Promise<Vokabel> {
    const vokabel = new VokabelModel({
      ...vokInput,
      creator: ctx.res.locals.userId,
    } as Vokabel);

    await vokabel.save();
    return vokabel;
  }

  //delete Voc by ID PRIVATE

  //update Voc by ID PRIVATE

  //define the reference type with FieldResolver and Root
  @FieldResolver()
  async creator(@Root() vokabel: Vokabel): Promise<User | null> {
    return await UserModel.findById(vokabel.creator);
  }
}
