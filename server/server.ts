//global imports
import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import colors from "colors";
import "reflect-metadata";
import "dotenv/config";

//schema
import createSchema from "./schema";

//connectDB
import { connectDB } from "./config/db";
connectDB();

//Schema
async function createServer() {
  try {
    //Port
    const port = process.env.PORT || 5000;

    //init app
    const app = express();

    //middleware CORS and JSON
    const corsOptions = {
      credentials: true,
      origin: "http://localhost:3000",
    };
    app.use(cors(corsOptions));
    app.use(express.json());
    const schema = await createSchema();

    // create GraphQL server
    const apolloServer = new ApolloServer({
      schema,
      context: ({ req, res }) => ({ req, res }),
      introspection: true,
      // enable GraphQL Playground
      playground: {
        settings: {
          "request.credentials": "include",
        },
      },
    });

    apolloServer.applyMiddleware({ app, cors: corsOptions });

    app.listen(port, () => {
      console.log(
        colors.bgBlue(
          `🚀 Server rennt auf dem Port http://localhost:${port}${apolloServer.graphqlPath} 🚀`
        )
      );
    });
  } catch (error) {
    console.log(error);
  }
}

createServer();
