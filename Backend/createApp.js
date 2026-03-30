import express from "express";
import morgan from "morgan";
import cors from "cors";
import usersRoutes from "./routes/usersRoute.js";
import postsRoutes from "./routes/postsRoute.js";
import commentsRoutes from "./routes/commentsRoute.js";
import authenticator from "./middleware/Authenticator.js";

export function createApp() {
  const app = express();

  app.use(express.json());

  app.use(
    cors({
      credentials: false,
    }),
  );

  app.use("/api/users", usersRoutes);
  app.use("/api/posts", authenticator, postsRoutes);
  app.use("/api/comments", authenticator, commentsRoutes);

  return app;
}
