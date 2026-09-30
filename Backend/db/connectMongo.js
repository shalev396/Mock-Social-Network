import mongoose from "mongoose";

/**
 * Reuse a single Mongoose connection per Lambda execution environment.
 * @see https://www.mongodb.com/docs/atlas/manage-connections-aws-lambda/
 */
export async function connectMongo() {
  const uri = process.env.DATABASE_URL;
  if (!uri) {
    throw new Error("DATABASE_URL is not set");
  }

  const state = mongoose.connection.readyState;
  if (
    state === mongoose.ConnectionStates.connected ||
    state === mongoose.ConnectionStates.connecting
  ) {
    return;
  }

  await mongoose.connect(uri, {
    maxPoolSize: 2,
    minPoolSize: 0,
    maxIdleTimeMS: 60_000,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  });
}
