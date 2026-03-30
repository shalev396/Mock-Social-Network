import "dotenv/config";
import serverlessHttp from "serverless-http";
import { connectMongo } from "./db/connectMongo.js";
import { createApp } from "./createApp.js";

await connectMongo();
const app = createApp();

export const handler = serverlessHttp(app, {
  binary: true,
});
