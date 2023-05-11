import { config } from "dotenv";
import express, { Application } from "express";
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from "http";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import resolvers from "./Schema/Resolvers.js";
import typeDefs from "./Schema/TypeDefs.js";
config();

const PORT = process.env.PORT
const app: Application = express();
const httpServer = http.createServer(app)

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

app.use(cors())
app.use(express.json())
await server.start()

app.use("/graphql", expressMiddleware(server))

app.listen(PORT, () => console.log(`🚀  Running on: http://localhost:${PORT}/`));